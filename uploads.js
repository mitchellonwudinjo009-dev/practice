// ==========================================
// PROPERTY UPLOAD PORTAL (EXTERIOR & INTERIOR)
// ==========================================

const UploadState = {
  listingType: 'Sale',
  title: '',
  tagline: '',
  address: '',
  city: 'Lagos',
  isCustomCity: false,
  customCity: '',
  buyPrice: '',
  rentMonthly: '',
  beds: '3',
  baths: '3',
  sqft: '2500',
  description: '',
  showPaymentStep: false,
  categoryPhotos: {
    exterior: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
    bedroom: ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'],
    kitchen: ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'],
    livingRoom: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'],
    bathroom: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80']
  },
  unlockedLimits: {
    exterior: 3,
    bedroom: 3,
    kitchen: 3,
    livingRoom: 3,
    bathroom: 3
  }
};

function syncUploadFieldsFromDOM() {
  const getVal = (id) => document.getElementById(id)?.value;
  if (getVal('up-title') !== undefined) UploadState.title = getVal('up-title');
  if (getVal('up-tagline') !== undefined) UploadState.tagline = getVal('up-tagline');
  if (getVal('up-address') !== undefined) UploadState.address = getVal('up-address');
  if (getVal('up-custom-city') !== undefined) UploadState.customCity = getVal('up-custom-city');
  if (getVal('up-buy-price') !== undefined) UploadState.buyPrice = getVal('up-buy-price');
  if (getVal('up-rent-monthly') !== undefined) UploadState.rentMonthly = getVal('up-rent-monthly');
}

function setUploadPurpose(purpose) {
  syncUploadFieldsFromDOM();
  UploadState.listingType = purpose;
  renderApp();
}

function handleUploadCityChange(val) {
  syncUploadFieldsFromDOM();
  if (val === '__CUSTOM__') {
    UploadState.isCustomCity = true;
    UploadState.customCity = '';
  } else {
    UploadState.isCustomCity = false;
    UploadState.city = val;
  }
  renderApp();
}

function revertUploadCitySelect() {
  syncUploadFieldsFromDOM();
  UploadState.isCustomCity = false;
  UploadState.city = 'Lagos';
  renderApp();
}

function updateUploadPhotoUrl(catKey, index, val) {
  UploadState.categoryPhotos[catKey][index] = val;
  const img = document.getElementById(`preview-${catKey}-${index}`);
  if (img) img.src = val || 'https://placehold.co/600x400/e2e8f0/475569?text=Select+Photo';
}

function handleUploadPhotoFile(event, catKey, index) {
  const file = event.target.files?.[0];
  if (!file) return;
  syncUploadFieldsFromDOM();
  const reader = new FileReader();
  reader.onload = (e) => {
    UploadState.categoryPhotos[catKey][index] = e.target.result;
    renderApp();
    showToast(`Photo #${index + 1} uploaded!`);
  };
  reader.readAsDataURL(file);
}

function addCategoryPhotoSlot(catKey, label) {
  syncUploadFieldsFromDOM();
  const count = UploadState.categoryPhotos[catKey].length;
  const maxAllowed = UploadState.unlockedLimits[catKey];

  if (count >= maxAllowed) {
    openExtraSlotPaywallModal(catKey, label);
    return;
  }

  UploadState.categoryPhotos[catKey].push('');
  renderApp();
}

function removeCategoryPhotoSlot(catKey, index) {
  syncUploadFieldsFromDOM();
  if (UploadState.categoryPhotos[catKey].length <= 1) return;
  UploadState.categoryPhotos[catKey].splice(index, 1);
  renderApp();
}

function openExtraSlotPaywallModal(catKey, label) {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
        <div class="flex justify-between items-center border-b border-slate-100 pb-3">
          <div class="flex items-center gap-2">
            <i class="fas fa-lock text-amber-500"></i>
            <h3 class="font-serif font-bold text-lg text-slate-900">Category Limit Reached (3/3)</h3>
          </div>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700"><i class="fas fa-times"></i></button>
        </div>

        <div class="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-950 space-y-2">
          <p class="font-bold text-sm">You have reached the 3-photo limit for "${label}".</p>
          <p class="text-amber-800 leading-relaxed">
            Each part of the house (Exterior, Bedrooms, Kitchen, Living Room, Bathrooms) allows up to <strong>3 details/photos</strong> in the standard upload package. Pay <strong>₦1,000</strong> to unlock an additional photo slot for this section.
          </p>
        </div>

        <div class="flex gap-3">
          <button onclick="closeModal()" class="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-xs">Cancel</button>
          <button onclick="confirmPayExtraSlot('${catKey}', '${label.replace(/'/g, "\\'")}')" class="w-2/3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider">
            Pay ₦1,000 to Add More
          </button>
        </div>
      </div>
    </div>
  `;
}

function confirmPayExtraSlot(catKey, label) {
  UploadState.unlockedLimits[catKey] += 1;
  UploadState.categoryPhotos[catKey].push('');
  closeModal();
  renderApp();
  showToast(`₦1,000 paid! Extra photo slot unlocked for ${label}.`);
}

function proceedToListingCheckout(e) {
  e.preventDefault();
  if (!AppState.currentUser) {
    openAuthModal('You must sign in or create an account before uploading a property listing.');
    return;
  }
  syncUploadFieldsFromDOM();
  UploadState.showPaymentStep = true;
  renderApp();
}

function publishUploadedProperty() {
  const sanitize = (arr, fallback) => {
    const valid = arr.filter(u => u && u.trim() !== '');
    return valid.length > 0 ? valid : [fallback];
  };

  const fee = UploadState.listingType === 'Sale' ? 3000 : 6000;
  const finalCity = (UploadState.isCustomCity ? UploadState.customCity.trim() : UploadState.city) || 'Lagos';

  const newListing = {
    id: Date.now(),
    title: UploadState.title || "Modern Luxury Property",
    tagline: UploadState.tagline || "Newly Listed Residence",
    listingType: UploadState.listingType,
    buyPrice: Number(UploadState.buyPrice) || 45000000,
    rentMonthly: Number(UploadState.rentMonthly) || 350000,
    rentYearly: (Number(UploadState.rentMonthly) || 350000) * 12,
    address: UploadState.address || "Victoria Island, Lagos",
    city: finalCity,
    type: "Single Family",
    featured: false,
    beds: Number(UploadState.beds) || 3,
    baths: Number(UploadState.baths) || 3,
    sqft: Number(UploadState.sqft) || 2500,
    yearBuilt: 2026,
    garage: 2,
    ownerId: AppState.currentUser.id,
    images: {
      exterior: sanitize(UploadState.categoryPhotos.exterior, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'),
      bedroom: sanitize(UploadState.categoryPhotos.bedroom, 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'),
      kitchen: sanitize(UploadState.categoryPhotos.kitchen, 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'),
      livingRoom: sanitize(UploadState.categoryPhotos.livingRoom, 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'),
      bathroom: sanitize(UploadState.categoryPhotos.bathroom, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80')
    },
    amenities: ["Modern Kitchen", "Security System", "Water Treatment", "Spacious Parking"],
    description: "Gorgeous newly listed property located in a prime neighborhood with top security.",
    agent: {
      name: AppState.currentUser.name,
      phone: AppState.currentUser.phone || "+234 803 605 7747",
      email: AppState.currentUser.email,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      role: "Property Listing Owner"
    }
  };

  AppState.properties.unshift(newListing);
  UploadState.showPaymentStep = false;
  showToast(`Property published to 'For ${UploadState.listingType}' after ₦${fee.toLocaleString()} payment!`);
  switchTab('messages');
}

function renderUploadView() {
  if (!AppState.currentUser) {
    return `
      <div class="max-w-3xl mx-auto px-4 py-20 text-center">
        <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
          <i class="fas fa-lock text-4xl text-amber-500"></i>
          <h2 class="text-2xl font-serif font-bold text-slate-900">Sign In Required to Upload</h2>
          <p class="text-xs text-slate-500 max-w-md mx-auto">
            Before uploading your building property for sale or rent, you must log in or sign up to manage your listing and chat with interested buyers.
          </p>
          <button onclick="openAuthModal('Sign up or log in to list your house for sale or rent.')" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider">
            Sign In / Sign Up Now
          </button>
        </div>
      </div>
    `;
  }

  const baseFee = UploadState.listingType === 'Sale' ? 3000 : 6000;

  if (UploadState.showPaymentStep) {
    return `
      <div class="max-w-lg mx-auto px-4 py-12">
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div class="text-center space-y-2 border-b border-slate-100 pb-4">
            <i class="fas fa-credit-card text-3xl text-amber-500"></i>
            <h3 class="font-serif font-bold text-xl text-slate-900">Complete Listing Payment</h3>
            <p class="text-xs text-slate-500">Payment required to publish listing under <span class="font-bold text-slate-800">For ${UploadState.listingType}</span> page.</p>
          </div>

          <div class="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs">
            <div class="flex justify-between"><span class="text-slate-500">Listing Purpose:</span><span class="font-bold text-slate-800">For ${UploadState.listingType}</span></div>
            <div class="flex justify-between"><span class="text-slate-500">Publisher:</span><span class="font-bold text-slate-800">${AppState.currentUser.name}</span></div>
            <div class="flex justify-between border-t border-slate-200 pt-2 font-bold text-sm">
              <span class="text-slate-900">Total Fee:</span><span class="text-amber-600">₦${baseFee.toLocaleString()}</span>
            </div>
          </div>

          <div class="flex gap-3">
            <button onclick="UploadState.showPaymentStep = false; renderApp();" class="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-xs">Back</button>
            <button onclick="publishUploadedProperty()" class="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider">
              Pay ₦${baseFee.toLocaleString()} & Publish
            </button>
          </div>
        </div>
      </div>
    `;
  }

  const sections = [
    { key: 'exterior', title: 'Section A: The Exterior (Front View, Compound & Gate)', badge: 'bg-amber-100 text-amber-900' },
    { key: 'bedroom', title: 'Section B1: The Interior — Bedrooms (Master & Guest Rooms)', badge: 'bg-emerald-100 text-emerald-900' },
    { key: 'kitchen', title: 'Section B2: The Interior — Kitchen (Cabinets, Island & Dining)', badge: 'bg-emerald-100 text-emerald-900' },
    { key: 'livingRoom', title: 'Section B3: The Interior — Living Room (Parlor & Lounge)', badge: 'bg-emerald-100 text-emerald-900' },
    { key: 'bathroom', title: 'Section B4: The Interior — Bathrooms (Toilets & Showers)', badge: 'bg-emerald-100 text-emerald-900' }
  ];

  return `
    <div class="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 class="text-3xl font-serif font-bold text-slate-900">Upload Property Listing</h1>
        <p class="text-xs text-slate-500 mt-1">Flat fee: ₦3,000 for BUY / ₦6,000 for RENT (includes up to 3 photos per house category).</p>
      </div>

      <form onsubmit="proceedToListingCheckout(event)" class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div class="space-y-2">
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">1. Choose Listing Purpose *</label>
          <div class="grid grid-cols-2 gap-4">
            <button type="button" onclick="setUploadPurpose('Sale')" class="p-4 rounded-2xl border-2 text-left transition-all ${
              UploadState.listingType === 'Sale' ? 'border-amber-500 bg-amber-50/50 text-slate-950' : 'border-slate-200 bg-slate-50 text-slate-600'
            }">
              <div class="font-bold text-sm">For Sale (Buy)</div>
              <div class="text-xs text-amber-600 font-semibold mt-1">Listing Fee: ₦3,000</div>
            </button>
            <button type="button" onclick="setUploadPurpose('Rent')" class="p-4 rounded-2xl border-2 text-left transition-all ${
              UploadState.listingType === 'Rent' ? 'border-emerald-500 bg-emerald-50/50 text-slate-950' : 'border-slate-200 bg-slate-50 text-slate-600'
            }">
              <div class="font-bold text-sm">For Rent</div>
              <div class="text-xs text-emerald-700 font-semibold mt-1">Listing Fee: ₦6,000</div>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Property Title *</label>
            <input type="text" id="up-title" required value="${UploadState.title}" placeholder="e.g. Modern 4 Bedroom Duplex" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Tagline / Short Subtitle</label>
            <input type="text" id="up-tagline" value="${UploadState.tagline}" placeholder="e.g. Luxury Living in Prime Location" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="sm:col-span-2">
            <label class="block text-xs font-semibold text-slate-700 mb-1">Full Address *</label>
            <input type="text" id="up-address" required value="${UploadState.address}" placeholder="Street address, neighborhood" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">City / Location *</label>
            ${!UploadState.isCustomCity ? `
              <select onchange="handleUploadCityChange(this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500">
                ${['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Enugu', 'Kano', 'Owerri'].map(c => `
                  <option value="${c}" ${UploadState.city === c ? 'selected' : ''}>${c}</option>
                `).join('')}
                <option value="__CUSTOM__">+ Type another city / place...</option>
              </select>
            ` : `
              <div class="flex gap-1.5">
                <input type="text" id="up-custom-city" required value="${UploadState.customCity}" placeholder="Type city or location..." class="w-full bg-slate-50 border border-amber-500 rounded-xl px-3 py-2.5 text-xs focus:outline-none" />
                <button type="button" onclick="revertUploadCitySelect()" class="px-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-[11px] font-bold">List</button>
              </div>
            `}
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Buy Price (₦) *</label>
            <input type="number" id="up-buy-price" required value="${UploadState.buyPrice}" placeholder="e.g. 50000000" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Rent Monthly Rate (₦) *</label>
            <input type="number" id="up-rent-monthly" required value="${UploadState.rentMonthly}" placeholder="e.g. 400000" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500" />
          </div>
        </div>

        <!-- Exterior & Interior Sections (3-Photo Limit per Category) -->
        <div class="space-y-6 pt-2">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">2. Upload House Pictures: The Exterior & The Interior *</label>
              <p class="text-[11px] text-slate-500 mt-0.5">Each category allows up to <strong>3 photos/details</strong>. Pay ₦1,000 per extra slot beyond 3.</p>
            </div>
            <span class="text-[11px] font-bold bg-slate-900 text-amber-400 px-3 py-1 rounded-full self-start">Limit: 3 Free / Category</span>
          </div>

          ${sections.map(sec => {
            const photos = UploadState.categoryPhotos[sec.key];
            const maxAllowed = UploadState.unlockedLimits[sec.key];
            const atLimit = photos.length >= maxAllowed;
            const shortLabel = sec.title.split('—')[1]?.trim() || sec.key;

            return `
              <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
                  <h3 class="font-serif font-bold text-sm text-slate-900">${sec.title}</h3>
                  <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full ${sec.badge}">
                    ${photos.length} / ${maxAllowed} Used ${maxAllowed > 3 ? `(+${maxAllowed - 3} Paid)` : '(Free Limit: 3)'}
                  </span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  ${photos.map((url, idx) => `
                    <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-2.5 flex flex-col justify-between">
                      <div class="flex items-center justify-between">
                        <span class="text-[11px] font-bold text-slate-700">Photo #${idx + 1} ${idx >= 3 ? '<span class="text-amber-600">(Paid)</span>' : ''}</span>
                        ${photos.length > 1 ? `<button type="button" onclick="removeCategoryPhotoSlot('${sec.key}', ${idx})" class="text-rose-500 hover:text-rose-700 text-[10px] font-bold">Remove</button>` : ''}
                      </div>

                      <div class="relative h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img id="preview-${sec.key}-${idx}" src="${url || 'https://placehold.co/600x400/e2e8f0/475569?text=Select+Photo'}" alt="Preview" class="w-full h-full object-cover" />
                      </div>

                      <label class="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold py-1.5 px-2.5 rounded-xl text-[11px] cursor-pointer transition-colors flex items-center justify-center gap-1.5">
                        <i class="fas fa-camera"></i>
                        <span>Choose Image File</span>
                        <input type="file" accept="image/*" onchange="handleUploadPhotoFile(event, '${sec.key}', ${idx})" class="hidden" />
                      </label>

                      <input type="text" value="${url}" oninput="updateUploadPhotoUrl('${sec.key}', ${idx}, this.value)" placeholder="Or paste image URL..." class="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-[10px] text-slate-600 focus:outline-none focus:border-amber-500" />
                    </div>
                  `).join('')}

                  <button type="button" onclick="addCategoryPhotoSlot('${sec.key}', '${shortLabel.replace(/'/g, "\\'")}')" class="min-h-[210px] rounded-2xl border-2 border-dashed p-4 flex flex-col items-center justify-center text-center transition-all space-y-2 ${
                    atLimit ? 'border-amber-400 bg-amber-50/60 hover:bg-amber-100/70 text-amber-900' : 'border-slate-300 bg-white hover:border-slate-900 text-slate-700'
                  }">
                    ${atLimit ? `
                      <div class="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-sm"><i class="fas fa-lock"></i></div>
                      <div class="font-bold text-xs">3/3 Limit Reached</div>
                      <div class="text-[11px] text-amber-800">Pay ₦1,000 to add more details/photos</div>
                    ` : `
                      <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center"><i class="fas fa-plus"></i></div>
                      <div class="font-bold text-xs">Add Photo #${photos.length + 1}</div>
                      <div class="text-[10px] text-slate-500">${maxAllowed - photos.length} slot(s) remaining</div>
                    `}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <button type="submit" class="w-full bg-slate-950 hover:bg-slate-800 text-amber-400 font-bold py-3.5 rounded-xl transition-all shadow-lg text-xs uppercase tracking-wider">
          Proceed to Fee Checkout (₦${baseFee.toLocaleString()}) →
        </button>
      </form>
    </div>
  `;
}