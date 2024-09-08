export const httpRequest = <T = Response>(input: string, init?: RequestInit): Promise<T> =>
    fetch(`${input}`, init)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }

            return Promise.reject(res);
        });