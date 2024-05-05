async function fetchItems(type) {
    try {
        const response = await fetch(`/api/${type}`);

        if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.log('Error fetching projects:', error);
    }
}

function formatMonthYear(dateString) {
    if(dateString === "present") return "present";
    const date = new Date(dateString);
    const options = { month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function renderItems(items) {
    const itemsContainer = document.getElementById('items-container');
    const colors = ["border-teal-300", "border-orange-300", "border-pink-300", "border-yellow-300"];
    items.forEach((item, i) => {
        const itemsCard = document.createElement('div');
        itemsCard.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'mb-4', 'border-2', 'space-y-2');
        itemsCard.classList.add(colors[i % colors.length]);
        itemsCard.innerHTML = `
            <div class="flex justify-between">
                <h2 class="text-xl font-bold">${item.title}</h2>
                <p class="text-gray-500 flex-shrink-0">${formatMonthYear(item.start_date)} - ${formatMonthYear(item.end_date)}</p>
            </div>
            <p class="text-gray-600">${item.description}</p>
        `;
        itemsContainer.appendChild(itemsCard);
    });
}