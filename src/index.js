const TYPE_MAP = {
    alert: 'alert',
    modal: 'modal',
};

// TODO: 单例模式
// TODO: 钩子函数
function Modal(config) {
    this.config = config || {
        type: TYPE_MAP.alert,

        modalStyle: '',
        maskStyle: '',
    };

    this.config.title = this.config.title || '';
    this.config.body = this.config.body || '';


    this.createMask();
    this.createModal();
}

Modal.prototype.createMask = function() {
    var maskEl = document.createElement('div');
    var self = this;

    this.maskEl = maskEl;
    this.maskEl.className = 'ack-mask';

    // 自定义样式
    if (this.config.maskStyle) {
        this.maskEl.style = this.config.maskStyle;
    }

    this.maskEl.onclick = function(event) {
        const target = event.target;

        if (target == self.maskEl) {
            this.style.display = 'none';
        }
    };

    document.body.appendChild(this.maskEl);
};

Modal.prototype.createModal = function() {
    var modalEl = document.createElement('div');
    var self = this;
    this.modalEl = modalEl;

    var modalHeaderEl = document.createElement('div');
    modalHeaderEl.innerHTML = this.config.title;
    modalHeaderEl.className = 'ack-modal-header';

    var modalBodyEl = document.createElement('div');
    if (this.config.body instanceof HTMLElement) {
        modalBodyEl.appendChild(this.config.body);
    } else {
        modalBodyEl.innerHTML = this.config.body;
    }
    modalBodyEl.className = 'ack-modal-body';

    var modalFooterEl = document.createElement('div');
    if (this.config.type === TYPE_MAP.modal) {
        var cancelBtn = document.createElement('button');
        cancelBtn.innerHTML = '取消';
        cancelBtn.onclick = function() {
            self.maskEl.style.display = 'none';
            self.modalEl.style.display = 'none';
        };

        var confirmBtn = document.createElement('button');
        confirmBtn.innerHTML = '确认';
        confirmBtn.onclick = function() {
            self.maskEl.style.display = 'none';
            self.modalEl.style.display = 'none';
        };

        modalFooterEl.appendChild(cancelBtn);
        modalFooterEl.appendChild(confirmBtn);
        modalFooterEl.className = 'ack-modal-footer';
    }



    this.modalEl.className = 'ack-modal';
    this.modalEl.appendChild(modalHeaderEl);
    this.modalEl.appendChild(modalBodyEl);
    this.modalEl.appendChild(modalFooterEl);

    // 自定义样式
    if (this.config.modalStyle) {
        this.modalEl.style = this.config.modalStyle;
    }

    this.maskEl.appendChild(modalEl);
};


document.querySelector('#openModal').onclick = function() {
    var bodyEl = document.createElement('div');
    bodyEl.innerHTML = '我是主体内容';

    var modal = new Modal({
        type: TYPE_MAP.modal,
        title: '我是标题',
        body: bodyEl,
    });
}