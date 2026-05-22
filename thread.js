const CACHE_NAME = 'slow-function-cache';
const RESULT_CACHE_KEY = './slow-function-result';

const messageTypes = {
    getResult: 'GET_RESULT',
    recalculateResult: 'RECALCULATE_RESULT',
    result: 'RESULT',
    error: 'ERROR',
};

const slowFunction = (timeout = 3000) => {
    const start = performance.now();
    let x = 0;
    let i = 0;

    do {
        i += 1;
        x += (Math.random() - 0.5) * i;
    } while (performance.now() - start < timeout);

    return `end ${x}`;
};

const getResultCache = async () => caches.open(CACHE_NAME);

const saveCachedResult = async (result) => {
    const cache = await getResultCache();
    const response = new Response(JSON.stringify({
        result,
        createdAt: new Date().toISOString(),
    }));

    await cache.put(RESULT_CACHE_KEY, response);
};

const readCachedResult = async () => {
    const cache = await getResultCache();
    const response = await cache.match(RESULT_CACHE_KEY);

    if (!response) {
        return null;
    }

    return response.json();
};

const recalculate = async (timeout) => {
    const result = slowFunction(timeout);

    await saveCachedResult(result);

    return result;
};

const getCachedResult = async (timeout) => {
    const cachedResult = await readCachedResult();

    if (cachedResult) {
        return cachedResult.result;
    }

    return recalculate(timeout);
};

const broadcast = async (message) => {
    const clients = await self.clients.matchAll({
        includeUncontrolled: true,
        type: 'window',
    });

    clients.forEach((client) => {
        client.postMessage(message);
    });
};

self.addEventListener('install', (evt) => {
    evt.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (evt) => {
    evt.waitUntil(self.clients.claim());
});

self.addEventListener('message', (evt) => {
    evt.waitUntil((async () => {
        const { type, payload = {} } = evt.data;
        const timeout = payload.timeout || 3000;

        if (type === messageTypes.getResult) {
            const result = await getCachedResult(timeout);

            await broadcast({
                type: messageTypes.result,
                payload: {
                    result,
                },
            });
        }

        if (type === messageTypes.recalculateResult) {
            const result = await recalculate(timeout);

            await broadcast({
                type: messageTypes.result,
                payload: {
                    result,
                },
            });
        }
    })().catch(async (error) => {
        await broadcast({
            type: messageTypes.error,
            payload: {
                message: 'Ошибка выполнения сервис-воркера',
            },
        });

        console.error('Ошибка выполнения сервис-воркера:', error);
    }));
});
