// ==========================================
// APPLICATION DATA & SHARED STATE
// ==========================================

const INITIAL_PROPERTIES = [
  {
    id: 1,
    title: "The Royal Glass Mansion",
    tagline: "Ultra-Modern Architectural Masterpiece",
    listingType: "Sale",
    buyPrice: 85000000,
    rentMonthly: 450000,
    rentYearly: 5000000,
    address: "14 Banana Island Road, Ikoyi, Lagos",
    city: "Lagos",
    type: "Single Family",
    featured: true,
    beds: 5,
    baths: 6,
    sqft: 6800,
    yearBuilt: 2023,
    garage: 3,
    ownerId: "admin-1",
    images: {
      exterior: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
      ],
      bedroom: [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80"
      ],
      livingRoom: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
      ],
      bathroom: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    amenities: ["Infinity Pool", "Smart Home System", "Wine Cellar", "Waterfront View", "Home Theater", "Private Spa"],
    description: "Perched in exclusive Banana Island with sweeping waterfront views, this mansion is a triumph of contemporary architecture with top-of-the-line Italian finishes throughout.",
    agent: {
      name: "Onwudinjo Daniel Chinedu",
      phone: "+234 803 605 7747",
      email: "daniel.admin@gmail.com",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      role: "Main Executive Administrator"
    }
  },
  {
    id: 2,
    title: "Penthouse Horizon Suite",
    tagline: "Panoramic Skyline Residence",
    listingType: "Rent",
    buyPrice: 65000000,
    rentMonthly: 600000,
    rentYearly: 6800000,
    address: "Aso Drive, Maitama, Abuja",
    city: "Abuja",
    type: "Condo",
    featured: true,
    beds: 3,
    baths: 3.5,
    sqft: 3400,
    yearBuilt: 2022,
    garage: 2,
    ownerId: "admin-1",
    images: {
      exterior: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
      ],
      bedroom: [
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80"
      ],
      livingRoom: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
      ],
      bathroom: [
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    amenities: ["Private Elevator", "24/7 Security", "Wrap-around Terrace", "Fitness Center", "Concierge Service", "Marble Island"],
    description: "Offering luxury living in Maitama with soaring 14ft ceilings, custom marble kitchen, and private rooftop view of Abuja city.",
    agent: {
      name: "Onwudinjo Daniel Chinedu",
      phone: "+234 803 605 7747",
      email: "daniel.admin@gmail.com",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      role: "Main Executive Administrator"
    }
  },
  {
    id: 3,
    title: "Waterfront Ocean Villa",
    tagline: "Private Dock & Resort Pool",
    listingType: "Sale",
    buyPrice: 120000000,
    rentMonthly: 850000,
    rentYearly: 9500000,
    address: "Eko Atlantic City, Victoria Island, Lagos",
    city: "Lagos",
    type: "Villa",
    featured: true,
    beds: 6,
    baths: 7,
    sqft: 7900,
    yearBuilt: 2023,
    garage: 4,
    ownerId: "admin-1",
    images: {
      exterior: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
      ],
      bedroom: [
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
      ],
      livingRoom: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
      ],
      bathroom: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    amenities: ["Private Boat Dock", "Resort Pool", "Outdoor Kitchen", "Guest House", "Gated Security", "Solar Powered"],
    description: "An extraordinary tropical retreat featuring deep-water dockage, lush landscaping, and seamless indoor-outdoor living built to high standards.",
    agent: {
      name: "Onwudinjo Daniel Chinedu",
      phone: "+234 803 605 7747",
      email: "daniel.admin@gmail.com",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      role: "Main Executive Administrator"
    }
  }
];

const AppState = {
  activeTab: 'home',
  properties: [...INITIAL_PROPERTIES],
  filterMode: 'All',
  cityFilter: 'All',
  searchTerm: '',
  favorites: [],
  registeredUsers: [],
  currentUser: null,
  chats: [
    {
      id: 1,
      propertyId: 1,
      propertyTitle: "The Royal Glass Mansion",
      buyerName: "Chidi Nnamdi",
      buyerEmail: "chidi.nnamdi@gmail.com",
      messages: [
        { sender: 'buyer', text: "Hello! Is The Royal Glass Mansion still available for viewing?", time: "10:30 AM" },
        { sender: 'owner', text: "Hello Chidi! Yes it is. Please contact Admin Daniel to schedule a time.", time: "10:32 AM" }
      ]
    }
  ],
  selectedChatId: 1,
  editingPropId: null
};

let toastTimer = null;
function showToast(msg) {
  const container = document.getElementById('toast-container');
  const textEl = document.getElementById('toast-text');
  if (!container || !textEl) return;

  textEl.textContent = msg;
  container.classList.remove('hidden');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    container.classList.add('hidden');
  }, 3500);
}

function closeModal() {
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
}