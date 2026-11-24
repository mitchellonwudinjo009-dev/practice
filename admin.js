// ==========================================
// CONTACT ADMIN VIEW (ONWUDINJO DANIEL CHINEDU)
// ==========================================

function renderAdminView() {
  const admins = [
    {
      name: "Onwudinjo Daniel Chinedu",
      role: "Main Executive Administrator & Managing Partner",
      whatsapp: "+234 803 605 7747",
      phoneRaw: "2348036057747",
      email: "daniel.chinedu@gmail.com",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      main: true
    },
    {
      name: "Victoria Adebayo",
      role: "Senior Listings Officer",
      whatsapp: "+234 802 111 2233",
      phoneRaw: "2348021112233",
      email: "victoria.adebayo@gmail.com",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      main: false
    }
  ];

  return `
    <div class="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <div class="text-center space-y-3">
        <span class="bg-amber-500/10 border border-amber-500/30 text-amber-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          Official Administrative Office
        </span>
        <h1 class="text-3xl sm:text-5xl font-serif font-bold text-slate-900">Contact Website Admin</h1>
        <p class="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Meeting times for property inspections are not fixed automatically. Clients must contact our main admin to discuss mutually required meeting times.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${admins.map(admin => `
          <div class="bg-white rounded-3xl p-6 sm:p-8 border shadow-xl flex flex-col justify-between space-y-6 ${
            admin.main ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200'
          }">
            <div class="space-y-4">
              ${admin.main ? `
                <span class="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  ★ Primary Lead Admin
                </span>
              ` : ''}

              <div class="flex items-center gap-4">
                <img src="${admin.image}" alt="${admin.name}" class="w-16 h-16 rounded-2xl object-cover border-2 border-slate-900" />
                <div>
                  <h3 class="font-serif font-bold text-xl text-slate-900">${admin.name}</h3>
                  <p class="text-xs text-amber-600 font-semibold">${admin.role}</p>
                </div>
              </div>

              <div class="space-y-2.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div class="flex items-center gap-2">
                  <i class="fab fa-whatsapp text-emerald-600 text-sm"></i>
                  <span class="font-bold text-slate-900">WhatsApp / Phone:</span>
                  <span>${admin.whatsapp}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-envelope text-amber-600"></i>
                  <span class="font-bold text-slate-900">Email:</span>
                  <span>${admin.email}</span>
                </div>
              </div>
            </div>

            <a href="https://wa.me/${admin.phoneRaw}?text=Hello%20${encodeURIComponent(admin.name)},%20I%20would%20like%20to%20discuss%20a%20property%20meeting%20time." target="_blank" rel="noopener noreferrer" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider flex items-center justify-center gap-2">
              <i class="fab fa-whatsapp text-base"></i>
              <span>Chat on WhatsApp (${admin.whatsapp})</span>
            </a>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}