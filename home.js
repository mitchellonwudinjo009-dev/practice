// ==========================================
// HOME VIEW, PROPERTY CARDS & INTERIOR MODAL
// ==========================================

function setHomeFilterMode(mode) {
  AppState.filterMode = mode;
  renderApp();
}

function setHomeCityFilter(city) {
  AppState.cityFilter = city;
  renderApp();
}

function setHomeSearchTerm(val) {
  AppState.searchTerm = val;
  const grid = document.getElementById('properties-grid-container');
  if (grid) {
    grid.innerHTML = renderFilteredPropertyGrid();
  }
}

function toggleFavoriteProperty(id, event) {
  if (event) event.stopPropagation();
  if (AppState.favorites.includes(id)) {
    AppState.favorites = AppState.favorites.filter(fav => fav !== id);
    showToast('Removed from saved properties');
  } else {
    AppState.favorites.push(id);
    showToast('Added to saved properties!');
  }
  renderApp();
}

function renderHomeView() {
  const availableCities = Array.from(new Set(AppState.properties.map(p => p.city).filter(Boolean)));

  return `
    <div class="space-y-12">
      <!-- Hero Banner -->
      <section class="relative bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div class="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80" alt="Hero" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>

        <div class="relative max-w-5xl mx-auto text-center space-y-6">
          <span class="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest">
            Verified Luxury Real Estate Platform
          </span>
          <h1 class="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-white">
            Find Your Dream Sanctuary
          </h1>
          <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light">
            Explore premium houses for sale or rent. Click any room detail to inspect bedroom or kitchen interiors before meeting our Executive Admin.
          </p>

          <!-- Filter Bar -->
          <div class="bg-white/10 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-white/15 max-w-4xl mx-auto shadow-2xl">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <!-- Type Switcher -->
              <div class="flex rounded-xl bg-slate-900/80 p-1 border border-slate-700">
                ${['All', 'Sale', 'Rent'].map(type => `
                  <button onclick="setHomeFilterMode('${type}')" class="flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    AppState.filterMode === type
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }">
                    ${type === 'All' ? 'All Homes' : type === 'Sale' ? 'For Sale' : 'For Rent'}
                  </button>
                `).join('')}
              </div>

              <!-- Location Selector -->
              <select onchange="setHomeCityFilter(this.value)" class="bg-slate-900/80 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500">
                <option value="All" ${AppState.cityFilter === 'All' ? 'selected' : ''}>All Locations (${availableCities.join(', ')})</option>
                ${availableCities.map(c => `
                  <option value="${c}" ${AppState.cityFilter === c ? 'selected' : ''}>${c}</option>
                `).join('')}
              </select>

              <!-- Search Bar -->
              <div class="relative">
                <i class="fas fa-search text-slate-400 text-xs absolute left-3.5 top-1/2 -translate-y-1/2"></i>
                <input type="text" placeholder="Search location or keyword..." value="${AppState.searchTerm}" oninput="setHomeSearchTerm(this.value)" class="w-full bg-slate-900/80 text-white pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:border-amber-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Property Cards Section -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 class="text-2xl font-serif font-bold text-slate-900">
              ${AppState.filterMode === 'All' ? 'Featured Properties' : AppState.filterMode === 'Sale' ? 'Properties For Sale' : 'Properties For Rent'}
            </h2>
            <p class="text-slate-500 text-xs mt-1">Browse verified properties with interior room previews</p>
          </div>
          
          <div class="flex gap-2">
            <span class="text-xs bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg">
              Rent Fee: ₦6,000 to upload
            </span>
            <span class="text-xs bg-amber-100 text-amber-900 font-semibold px-3 py-1.5 rounded-lg">
              Buy Fee: ₦3,000 to upload
            </span>
          </div>
        </div>

        <div id="properties-grid-container">
          ${renderFilteredPropertyGrid()}
        </div>
      </section>
    </div>
  `;
}

function renderFilteredPropertyGrid() {
  const filtered = AppState.properties.filter(p => {
    const matchesType = AppState.filterMode === 'All' || p.listingType === AppState.filterMode;
    const matchesCity = AppState.cityFilter === 'All' || p.city.toLowerCase() === AppState.cityFilter.toLowerCase();
    const term = AppState.searchTerm.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(term) || p.address.toLowerCase().includes(term) || p.city.toLowerCase().includes(term);
    return matchesType && matchesCity && matchesSearch;
  });

  if (filtered.length === 0) {
    return `
      <div class="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
        <i class="fas fa-home text-4xl text-slate-300 mb-3"></i>
        <h3 class="text-lg font-bold text-slate-700">No properties found</h3>
        <p class="text-xs text-slate-500 mt-1">Try switching filter tabs or altering your search text.</p>
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${filtered.map(prop => renderPropertyCard(prop)).join('')}
    </div>
  `;
}

function renderPropertyCard(property) {
  const isFav = AppState.favorites.includes(property.id);
  const coverImg = Array.isArray(property.images.exterior) ? property.images.exterior[0] : property.images.exterior;

  return `
    <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 hover:shadow-2xl transition-all duration-300 flex flex-col group">
      <div class="relative h-64 overflow-hidden bg-slate-900">
        <img src="${coverImg}" alt="${property.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>

        <div class="absolute top-4 left-4">
          <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md ${
            property.listingType === 'Sale' ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-white'
          }">
            For ${property.listingType}
          </span>
        </div>

        <button onclick="toggleFavoriteProperty(${property.id}, event)" class="absolute top-4 right-4 w-9 h-9 bg-slate-900/60 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-slate-900 transition-colors">
          <i class="${isFav ? 'fas fa-heart text-rose-500' : 'far fa-heart text-white'}"></i>
        </button>

        <div class="absolute bottom-3 left-4 right-4 text-white">
          <div class="flex items-center gap-1.5 text-xs text-slate-200 truncate">
            <i class="fas fa-map-marker-alt text-amber-400"></i>
            <span class="truncate font-medium">${property.address}</span>
          </div>
        </div>
      </div>

      <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div>
          <h3 onclick="openPropertyModal(${property.id}, 'exterior')" class="font-serif font-bold text-lg text-slate-900 hover:text-amber-600 transition-colors cursor-pointer">
            ${property.title}
          </h3>
          <p class="text-xs text-slate-500 font-medium line-clamp-1">${property.tagline}</p>

          <!-- Pricing Display: Buy Pay vs Rent Pay (Rent > Buy cumulative) -->
          <div class="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
            <div class="flex justify-between items-baseline">
              <span class="text-[11px] text-slate-500 font-semibold uppercase">Buy Price:</span>
              <span class="font-serif font-bold text-slate-900 text-base">₦${property.buyPrice.toLocaleString()}</span>
            </div>
            <div class="flex justify-between items-baseline pt-1 border-t border-slate-200/60">
              <span class="text-[11px] text-slate-500 font-semibold uppercase">Rent Pay:</span>
              <span class="text-xs font-bold text-emerald-700">
                ₦${property.rentMonthly.toLocaleString()} <span class="text-[10px] text-slate-400 font-normal">/ month</span>
                <span class="block text-[10px] text-slate-500 font-normal text-right">(₦${property.rentYearly.toLocaleString()} / year)</span>
              </span>
            </div>
          </div>

          <!-- Quick Bedroom / Kitchen Interior Preview Buttons -->
          <div class="mt-4 pt-3 border-t border-slate-100">
            <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Inspect Interior Rooms:
            </div>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <button onclick="openPropertyModal(${property.id}, 'bedroom')" class="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 px-2.5 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-colors">
                <i class="fas fa-bed text-amber-600"></i>
                <span>Bedrooms (${property.beds})</span>
              </button>
              <button onclick="openPropertyModal(${property.id}, 'kitchen')" class="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300/70 px-2.5 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-colors">
                <i class="fas fa-utensils text-slate-600"></i>
                <span>Kitchen</span>
              </button>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-slate-600 text-xs">
          <div class="flex items-center gap-3">
            <span><i class="fas fa-bed mr-1"></i>${property.beds}</span>
            <span><i class="fas fa-bath mr-1"></i>${property.baths}</span>
            <span><i class="fas fa-expand-arrows-alt mr-1"></i>${property.sqft} sqft</span>
          </div>

          <button onclick="initiateMeetingBooking(${property.id})" class="bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-bold px-3 py-1.5 rounded-xl text-[11px] transition-all flex items-center gap-1 shadow-sm">
            <i class="fas fa-calendar-alt"></i>
            <span>Book Meeting</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function openPropertyModal(propertyId, roomTab = 'exterior', photoIndex = 0) {
  const property = AppState.properties.find(p => p.id === propertyId);
  if (!property) return;

  const getRoomArr = (key) => Array.isArray(property.images[key]) ? property.images[key] : [property.images[key]];
  const photos = getRoomArr(roomTab);
  const activeImg = photos[photoIndex] || photos[0];

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div class="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 my-auto">
        <div class="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-widest text-amber-600">For ${property.listingType} • ${property.city}</span>
            <h2 class="text-xl font-serif font-bold text-slate-900">${property.title}</h2>
          </div>
          <button onclick="closeModal()" class="p-2 rounded-full hover:bg-slate-100 text-slate-500">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>

        <div class="p-6 space-y-6">
          <div class="space-y-3">
            <div class="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 shadow-inner">
              <img src="${activeImg}" alt="${roomTab}" class="w-full h-full object-cover animate-fade-in" />
              <div class="absolute bottom-4 left-4 bg-slate-950/70 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg border border-white/20 capitalize font-medium">
                Viewing: <span class="text-amber-400 font-bold">${roomTab === 'exterior' ? 'Exterior & Grounds' : roomTab}</span> (${photoIndex + 1} of ${photos.length})
              </div>
            </div>

            ${photos.length > 1 ? `
              <div class="flex gap-2.5 overflow-x-auto py-1">
                ${photos.map((url, idx) => `
                  <button onclick="openPropertyModal(${property.id}, '${roomTab}', ${idx})" class="relative w-20 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    photoIndex === idx ? 'border-amber-500 scale-105 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }">
                    <img src="${url}" alt="Angle ${idx + 1}" class="w-full h-full object-cover" />
                  </button>
                `).join('')}
              </div>
            ` : ''}

            <div class="flex gap-2 overflow-x-auto pb-1 text-xs font-semibold">
              ${[
                { id: 'exterior', label: 'Exterior' },
                { id: 'bedroom', label: 'Bedrooms' },
                { id: 'kitchen', label: 'Kitchen' },
                { id: 'livingRoom', label: 'Living Room' },
                { id: 'bathroom', label: 'Bathroom' }
              ].map(tab => `
                <button onclick="openPropertyModal(${property.id}, '${tab.id}', 0)" class="px-4 py-2 rounded-xl border transition-all whitespace-nowrap ${
                  roomTab === tab.id
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }">
                  ${tab.label} (${getRoomArr(tab.id).length})
                </button>
              `).join('')}
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div class="bg-white p-3.5 rounded-xl border border-slate-200/80">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Purchase Price (Buy)</span>
              <div class="text-2xl font-serif font-bold text-slate-900 mt-1">₦${property.buyPrice.toLocaleString()}</div>
              <p class="text-[11px] text-slate-500 mt-0.5">Full title ownership transfer</p>
            </div>
            <div class="bg-white p-3.5 rounded-xl border border-slate-200/80">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rental Price Rate</span>
              <div class="text-xl font-serif font-bold text-emerald-700 mt-1">₦${property.rentMonthly.toLocaleString()} <span class="text-xs font-normal text-slate-500">/ mo</span></div>
              <p class="text-[11px] text-slate-500 mt-0.5">Yearly: ₦${property.rentYearly.toLocaleString()}</p>
            </div>
          </div>

          <div>
            <h4 class="font-serif font-bold text-slate-900 text-sm mb-2">About Property</h4>
            <p class="text-xs text-slate-600 leading-relaxed">${property.description}</p>
            <div class="flex flex-wrap gap-2 mt-4">
              ${property.amenities.map(item => `
                <span class="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-lg border border-slate-200">✓ ${item}</span>
              `).join('')}
            </div>
          </div>

          <div class="bg-slate-950 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <img src="${property.agent.image}" alt="Admin" class="w-12 h-12 rounded-full object-cover border-2 border-amber-400" />
              <div>
                <div class="text-xs text-slate-400">Assigned Managing Admin</div>
                <div class="font-bold text-sm text-white">${property.agent.name}</div>
                <div class="text-xs text-amber-400">${property.agent.phone}</div>
              </div>
            </div>
            <button onclick="initiateMeetingBooking(${property.id})" class="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider">
              Contact Admin To Discuss Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function initiateMeetingBooking(propertyId) {
  if (!AppState.currentUser) {
    openAuthModal('You must sign up or log in before booking a meeting with the admin.');
    return;
  }

  const property = AppState.properties.find(p => p.id === propertyId);
  if (!property) return;

  const modalRoot = document.getElementById('modal-root');
  modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200">
        <div class="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <h3 class="font-serif font-bold text-lg text-slate-900">Discuss Meeting Time</h3>
            <p class="text-[11px] text-slate-500">Contact Admin Onwudinjo Daniel Chinedu</p>
          </div>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700"><i class="fas fa-times"></i></button>
        </div>

        <div class="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs text-amber-900 space-y-1">
          <div class="font-bold">⚠️ Note on Meeting Times:</div>
          <div>The required meeting time cannot be fixed by just clicking a calendar slot. You must contact the Admin directly to discuss and confirm a convenient time to meet.</div>
        </div>

        <form onsubmit="submitWhatsAppMeeting(event, ${property.id})" class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Target Property</label>
            <input type="text" readonly value="${property.title}" class="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-800" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Propose Preferred Days / Questions for Admin</label>
            <textarea id="meeting-notes" rows="3" placeholder="e.g. I am free this Thursday afternoon or Saturday morning. Please let me know what works for you." class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-amber-500"></textarea>
          </div>
          <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider flex items-center justify-center gap-2">
            <i class="fab fa-whatsapp text-base"></i>
            <span>Connect on WhatsApp (+234 803 605 7747)</span>
          </button>
        </form>
      </div>
    </div>
  `;
}

function submitWhatsAppMeeting(e, propertyId) {
  e.preventDefault();
  const property = AppState.properties.find(p => p.id === propertyId);
  const notes = document.getElementById('meeting-notes')?.value || '';
  const whatsappUrl = `https://wa.me/2348036057747?text=${encodeURIComponent(
    `Hello Admin Onwudinjo Daniel Chinedu!\nMy name is ${AppState.currentUser.name}.\nI am interested in property: "${property.title}" (${property.address}).\nMy Preferred Notes/Time Discussion: ${notes}`
  )}`;
  window.open(whatsappUrl, '_blank');
  showToast('Redirecting to WhatsApp to discuss required meeting time with Admin Daniel...');
  closeModal();
}