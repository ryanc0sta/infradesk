// As datas dos mocks são relativas ao momento em que o app abre, para a lista parecer sempre
// recente ("há 2h") em vez de envelhecer a partir de uma data fixa.
const now = Date.now();

export const minutesAgo = (minutes: number) => new Date(now - minutes * 60_000).toISOString();
export const hoursAgo = (hours: number) => minutesAgo(hours * 60);
export const daysAgo = (days: number) => hoursAgo(days * 24);
