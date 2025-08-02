// Open modal
document.querySelectorAll('[data-show-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-show-modal');
        const dialog = document.getElementById(modalId);
        
        // Créer le backdrop personnalisé
        const backdrop = document.createElement('div');
        backdrop.className = 'custom-backdrop';
        backdrop.dataset.modalId = modalId;
        document.body.appendChild(backdrop);
        
        dialog.showModal();
        dialog.classList.add('opening');
        
        // Animer le backdrop
        requestAnimationFrame(() => {
            backdrop.classList.add('show');
        });
        
        setTimeout(() => dialog.classList.remove('opening'), 300);
        
        // Fermer en cliquant sur le backdrop
        backdrop.addEventListener('click', () => {
            closeModal(dialog, backdrop);
        });
    });
});

// Close modal
document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close');
        const dialog = document.getElementById(modalId);
        const backdrop = document.querySelector(`.custom-backdrop[data-modal-id="${modalId}"]`);
        
        closeModal(dialog, backdrop);
    });
});

// Close modal if clicking outside content
document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', e => {
        const rect = dialog.getBoundingClientRect();
        const clickedInDialog = (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
        );
        
        if (!clickedInDialog) {
            const modalId = dialog.id;
            const backdrop = document.querySelector(`.custom-backdrop[data-modal-id="${modalId}"]`);
            closeModal(dialog, backdrop);
        }
    });
});

function closeModal(dialog, backdrop) {
    dialog.classList.add('closing');
    
    if (backdrop) {
        backdrop.classList.remove('show');
    }
    
    setTimeout(() => {
        dialog.classList.remove('closing');
        dialog.close();
        if (backdrop) {
            backdrop.remove();
        }
    }, 300);
}