
        // Imgur image links
        const MEDICINE_IMAGES = {
            'Cerevas.jpg': 'https://imgur.com/jAeTy44.jpg',
            'Ansulin.jpg': 'https://imgur.com/1i1YPRj.jpg',
            'Epitra.jpg': 'https://imgur.com/ypTOgfk.jpg',
            'Linatab.jpg': 'https://imgur.com/Cb0WfGO.jpg',
            'Neuroxen.jpg': 'https://imgur.com/in9yutX.jpg',
            'NoclogPlus.jpg': 'https://imgur.com/esKjSfX.jpg',
            'Prelica.jpg': 'https://imgur.com/3puFrxG.jpg',
            'Rolip.jpg': 'https://imgur.com/bsyNFKn.jpg'
        };

        const medicineScheduleEl = document.getElementById('medicine-schedule');
        const currentDateEl = document.getElementById('current-date');
        const prevDayBtn = document.getElementById('prev-day');
        const nextDayBtn = document.getElementById('next-day');
        const goToTodayBtn = document.getElementById('go-to-today');
        const toggleCalendarBtn = document.getElementById('toggle-calendar');
        const calendarContainer = document.getElementById('calendar-container');
        const calendarGridEl = document.getElementById('calendar-grid');
        const calendarMonthYearEl = document.getElementById('calendar-month-year');
        const prevMonthBtn = document.getElementById('prev-month');
        const nextMonthBtn = document.getElementById('next-month');

        const MEDICINE_SCHEDULE = {
            morning: [
                { name: 'Ansulin', bn_name: 'ইনসুলিন', timing: 'খাওয়ার আগে', image: 'Ansulin.jpg' },
                { name: 'Prelica', bn_name: 'প্রিলিকা', timing: 'খাওয়ার আগে', image: 'Prelica.jpg' },
                { name: 'Cerevus', bn_name: 'সেরেভাস', timing: 'খাওয়ার পর', image: 'Cerevas.jpg' }
            ],
            lunch: [
                { name: 'Linatab', bn_name: 'লিনাট্যাব', timing: 'খাওয়ার পরে', image: 'Linatab.jpg' },
                { name: 'Cerevus', bn_name: 'সেরেভাস', timing: 'খাওয়ার পরে', image: 'Cerevas.jpg' },
                { name: 'Neuroxen', bn_name: 'নিউরোক্সেন', timing: 'খাওয়ার পরে', image: 'Neuroxen.jpg' },
                { name: 'Noclog Plus', bn_name: 'নোক্লগ প্লাস', timing: 'খাওয়ার পর', image: 'NoclogPlus.jpg' }
            ],
            dinner: [
                { name: 'Rolip', bn_name: 'রোলিপ', timing: 'খাওয়ার আগে', image: 'Rolip.jpg' },
                { name: 'Ansulin', bn_name: 'ইনসুলিন', timing: 'খাওয়ার আগে', image: 'Ansulin.jpg' },
                { name: 'Prelica', bn_name: 'প্রিলিকা', timing: 'খাওয়ার পর', image: 'Prelica.jpg' },
                { name: 'Cerevus', bn_name: 'সেরেভাস', timing: 'খাওয়ার পর', image: 'Cerevas.jpg' },
                { name: 'Epitra', bn_name: 'এপিট্রা', timing: 'প্রয়োজনে খাওয়ার পর', image: 'Epitra.jpg' }
            ]
        };

        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        let calendarDate = new Date(currentDate);

        let dosesTaken = JSON.parse(localStorage.getItem('dosesTaken')) || {};

        const formatDate = (date) => {
            return date.toISOString().split('T')[0];
        };
        
        const displayDate = (date) => {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('bn-BD', options);
        };

        const renderMedicineList = () => {
            currentDateEl.textContent = displayDate(currentDate);
            medicineScheduleEl.innerHTML = '';
            const dateKey = formatDate(currentDate);

            if (!dosesTaken[dateKey]) {
                dosesTaken[dateKey] = {};
            }

            const mealTimes = [
                { key: 'morning', title: 'সকালের নাস্তা', icon: '☀️' },
                { key: 'lunch', title: 'দুপুরের খাবার', icon: '🍜' },
                { key: 'dinner', title: 'রাতের খাবার', icon: '🌙' }
            ];

            mealTimes.forEach(meal => {
                const mealContainer = document.createElement('div');
                mealContainer.className = 'bg-white/80 p-5 rounded-xl shadow-md';
                
                let medicinesHTML = MEDICINE_SCHEDULE[meal.key].map((med, index) => {
                    const medId = `${dateKey}-${meal.key}-${med.name}-${index}`;
                    const isChecked = dosesTaken[dateKey][medId] || false;
                    
                    const imageUrl = MEDICINE_IMAGES[med.image] || `https://placehold.co/48x48/e5e7eb/6b7280?text=Image+Not+Found`;

                    return `
                        <label for="${medId}" class="checkbox-label flex items-center justify-between p-3 my-2 rounded-lg cursor-pointer hover:bg-[#f3eade]/60 transition-colors">
                            <input type="checkbox" id="${medId}" class="hidden" data-meal="${meal.key}" data-med-index="${index}" ${isChecked ? 'checked' : ''}>
                             <div class="checked-effect flex items-center justify-between w-full">
                                <div class="flex items-center space-x-2">
                                    <div>
                                        <span class="font-semibold text-lg">${med.name}</span>
                                        <span class="text-gray-600 text-lg">${med.bn_name}</span>
                                    </div>
                                    <span class="medicine-time text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">${med.timing}</span>
                                </div>
                                <img src="${imageUrl}" alt="${med.name} ছবি" class="medicine-image" onerror="this.src='https://placehold.co/48x48/e5e7eb/6b7280?text=Error';">
                            </div>
                        </label>
                    `;
                }).join('');

                mealContainer.innerHTML = `
                    <h3 class="text-xl font-bold mb-3 text-[#c4a78a] flex items-center">${meal.icon} <span class="ml-2">${meal.title}</span></h3>
                    <div class="space-y-2">${medicinesHTML}</div>
                `;
                medicineScheduleEl.appendChild(mealContainer);
            });
        };
        
        const handleDoseCheck = (e) => {
            if (e.target.type === 'checkbox') {
                const dateKey = formatDate(currentDate);
                const medId = e.target.id;
                dosesTaken[dateKey][medId] = e.target.checked;
                localStorage.setItem('dosesTaken', JSON.stringify(dosesTaken));
                renderMedicineList(); // Re-render to apply strikethrough effect
            }
        };
        
        const renderCalendar = () => {
            calendarGridEl.innerHTML = '';
            const month = calendarDate.getMonth();
            const year = calendarDate.getFullYear();
            
            calendarMonthYearEl.textContent = new Date(year, month).toLocaleDateString('bn-BD', { month: 'long', year: 'numeric' });

            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            for (let i = 0; i < firstDayOfMonth; i++) {
                const emptyDiv = document.createElement('div');
                calendarGridEl.appendChild(emptyDiv);
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dayEl = document.createElement('button');
                dayEl.className = 'calendar-day text-center p-2 cursor-pointer';
                dayEl.textContent = day.toLocaleString('bn-BD');
                
                const thisDate = new Date(year, month, day);
                thisDate.setHours(0,0,0,0);
                const today = new Date();
                today.setHours(0,0,0,0);
                
                if (thisDate.getTime() === today.getTime()) {
                    dayEl.classList.add('today');
                }
                
                if (thisDate.getTime() === currentDate.getTime()) {
                    dayEl.classList.add('selected');
                }

                dayEl.addEventListener('click', () => {
                    currentDate = thisDate;
                    calendarDate = new Date(currentDate);
                    renderMedicineList();
                    renderCalendar();
                    calendarContainer.classList.add('hidden');
                    toggleCalendarBtn.textContent = 'ক্যালেন্ডার দেখুন';
                });
                calendarGridEl.appendChild(dayEl);
            }
        };

        prevDayBtn.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() - 1);
            calendarDate = new Date(currentDate);
            renderMedicineList();
            renderCalendar();
        });

        nextDayBtn.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() + 1);
            calendarDate = new Date(currentDate);
            renderMedicineList();
            renderCalendar();
        });
        
        goToTodayBtn.addEventListener('click', () => {
            currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            calendarDate = new Date(currentDate);
            renderMedicineList();
            renderCalendar();
        });

        medicineScheduleEl.addEventListener('change', handleDoseCheck);

        toggleCalendarBtn.addEventListener('click', () => {
            const isHidden = calendarContainer.classList.toggle('hidden');
            toggleCalendarBtn.textContent = isHidden ? 'ক্যালেন্ডার দেখুন' : 'ক্যালেন্ডার লুকান';
        });
        
        prevMonthBtn.addEventListener('click', () => {
            calendarDate.setMonth(calendarDate.getMonth() - 1);
            renderCalendar();
        });

        nextMonthBtn.addEventListener('click', () => {
            calendarDate.setMonth(calendarDate.getMonth() + 1);
            renderCalendar();
        });

        renderMedicineList();
        renderCalendar();
    