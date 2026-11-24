// ==========================================
// MY UPLOADS MANAGEMENT & SPEECH-BUBBLE CHAT
// ==========================================

function selectChatThread(chatId) {
  AppState.selectedChatId = chatId;
  renderApp();
}

function sendChatReply(e) {
  e.preventDefault();
  const input = document.getElementById('chat-reply-input');
  const text = (input?.value || '').trim();
  if (!text) return;

  const chat = AppState.chats.find(c => c.id === AppState.selectedChatId) || AppState.chats[0];
  if (!chat) return;

  chat.messages.push({
    sender: 'owner',
    text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  renderApp();
  showToast('Reply sent!');
}

function startEditUploadedProp(id) {
  AppState.editingPropId = id;
  renderApp();
}

function saveEditedUploadedProp(id) {
  const newTitle = (document.getElementById(`edit-prop-title-${id}`)?.value || '').trim();
  const prop = AppState.properties.find(p => p.id === id);
  if (prop && newTitle) {
    prop.title = newTitle;
    showToast('Property updated successfully!');
  }
  AppState.editingPropId = null;
  renderApp();
}

function deleteUploadedProp(id) {
  AppState.properties = AppState.properties.filter(p => p.id !== id);
  renderApp();
  showToast('Listing deleted.');
}

function renderMessagesView() {
  if (!AppState.currentUser) {
    return `
      <div class="max-w-3xl mx-auto px-4 py-20 text-center">
        <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
          <i class="fas fa-lock text-4xl text-amber-500"></i>
          <h2 class="text-2xl font-serif font-bold text-slate-900">Sign In to View Your Uploads & Messages</h2>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Log in to view your uploaded properties, edit details, and respond to buyer inquiry messages.</p>
          <button onclick="openAuthModal('Sign up or log in to view your uploaded properties and chats.')" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider">
            Sign In / Sign Up
          </button>
        </div>
      </div>
    `;
  }

  const userUploads = AppState.properties.filter(p => p.ownerId === AppState.currentUser.id);

  if (userUploads.length === 0) {
    return `
      <div class="max-w-2xl mx-auto px-4 py-20 text-center">
        <div class="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl space-y-4">
          <div class="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <i class="fas fa-home text-2xl"></i>
          </div>
          <h2 class="text-2xl font-serif font-bold text-slate-900">no uploads yet</h2>
          <p class="text-xs text-slate-500">You haven't uploaded any house property listings for sale or rent.</p>
          <button onclick="switchTab('uploads')" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider mt-2 inline-flex items-center gap-2">
            <i class="fas fa-plus"></i>
            <span>go to uploads</span>
          </button>
        </div>
      </div>
    `;
  }

  const currentChat = AppState.chats.find(c => c.id === AppState.selectedChatId) || AppState.chats[0];

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <section class="space-y-4">
        <h2 class="text-2xl font-serif font-bold text-slate-900">My Uploaded Properties (${userUploads.length})</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${userUploads.map(prop => {
            const thumb = Array.isArray(prop.images.exterior) ? prop.images.exterior[0] : prop.images.exterior;
            const isEditing = AppState.editingPropId === prop.id;
            return `
              <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-md space-y-3 flex flex-col justify-between">
                <div class="flex items-center gap-3">
                  <img src="${thumb}" alt="" class="w-16 h-16 rounded-xl object-cover" />
                  <div class="flex-grow">
                    ${isEditing ? `
                      <input type="text" id="edit-prop-title-${prop.id}" value="${prop.title}" class="border border-amber-500 rounded px-2 py-1 text-xs w-full" />
                    ` : `
                      <h4 class="font-bold text-sm text-slate-900">${prop.title}</h4>
                    `}
                    <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">For ${prop.listingType}</span>
                  </div>
                </div>

                <div class="text-xs text-slate-500 flex justify-between border-t border-slate-100 pt-2">
                  <span>Buy: ₦${prop.buyPrice.toLocaleString()}</span>
                  <span>Rent: ₦${prop.rentMonthly.toLocaleString()}/mo</span>
                </div>

                <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 text-xs">
                  ${isEditing ? `
                    <button onclick="saveEditedUploadedProp(${prop.id})" class="bg-emerald-600 text-white px-3 py-1 rounded-lg font-bold">Save</button>
                  ` : `
                    <button onclick="startEditUploadedProp(${prop.id})" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-lg font-semibold">Edit</button>
                  `}
                  <button onclick="deleteUploadedProp(${prop.id})" class="bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-1 rounded-lg font-semibold">Delete</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <section class="space-y-4 pt-6 border-t border-slate-200">
        <h2 class="text-2xl font-serif font-bold text-slate-900">Inquiries & Speech Bubble Chat Space</h2>
        <div class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[450px]">
          <div class="border-r border-slate-100 bg-slate-50/50 p-4 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Interested Buyers</h4>
            ${AppState.chats.map(chat => `
              <div onclick="selectChatThread(${chat.id})" class="p-3 rounded-2xl cursor-pointer transition-all border ${
                AppState.selectedChatId === chat.id ? 'bg-amber-50 border-amber-300 shadow-sm' : 'bg-white border-slate-200 hover:bg-slate-100'
              }">
                <div class="font-bold text-xs text-slate-900">${chat.buyerName}</div>
                <div class="text-[11px] text-slate-500 truncate mt-0.5">${chat.propertyTitle}</div>
              </div>
            `).join('')}
          </div>

          <div class="md:col-span-2 flex flex-col justify-between p-4 sm:p-6 bg-slate-50/30">
            <div class="border-b border-slate-200/60 pb-3 mb-4">
              <span class="text-[10px] text-slate-400 font-bold uppercase">Chat regarding:</span>
              <div class="font-bold text-sm text-slate-900">${currentChat.propertyTitle}</div>
              <div class="text-xs text-slate-500">Buyer: ${currentChat.buyerName} (${currentChat.buyerEmail})</div>
            </div>

            <div class="flex-grow space-y-4 overflow-y-auto max-h-72 pr-2 mb-4">
              ${currentChat.messages.map(m => `
                <div class="flex flex-col ${m.sender === 'owner' ? 'items-end' : 'items-start'}">
                  <div class="max-w-xs sm:max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    m.sender === 'owner'
                      ? 'bg-amber-500 text-slate-950 rounded-br-none font-medium'
                      : 'bg-slate-900 text-white rounded-bl-none'
                  }">
                    ${m.text}
                  </div>
                  <span class="text-[10px] text-slate-400 mt-1 px-1">${m.time}</span>
                </div>
              `).join('')}
            </div>

            <form onsubmit="sendChatReply(event)" class="flex gap-2 pt-3 border-t border-slate-200/60">
              <input type="text" id="chat-reply-input" placeholder="Type your message reply..." class="flex-grow bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-amber-500" />
              <button type="submit" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition-colors text-xs">Send</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  `;
}