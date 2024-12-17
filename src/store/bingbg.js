import { defineStore } from 'pinia';

export const useBingbgStore = defineStore('bingbg', {
    state: () => ({
        bingbg: localStorage.getItem('bingbg') || 'NoBingImg',
    }),
    actions: {
        setBingbg() {
            this.bingbg = this.bingbg === 'bingImg' ? 'NoBingImg' : 'bingImg';
            localStorage.setItem('bingbg', this.bingbg);
            document.body.className = this.bingbg;
        },
    }
});