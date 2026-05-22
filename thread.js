self.addEventListener('message', (evt) => {
    const thread = new Worker('./thread2.js');

    thread.addEventListener('message', (messageEvt) => {
        self.postMessage(messageEvt.data);
        thread.terminate();
    });

    thread.addEventListener('error', (err) => {
        self.postMessage('Ошибка выполнения вложенного веб-воркера');
        console.error('Ошибка выполнения вложенного веб-воркера:', err);
        thread.terminate();
    });

    thread.postMessage(evt.data);
});
