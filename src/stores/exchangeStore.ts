import { defineStore } from "pinia";
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db, docId, collection } from "../firebase/firebase";

export interface IExchangeState {
    exchangeRateBuy: number
    exchangeRateSell: number
    unsubscribe: null|(() => void)
}

export const useExchangeStore = defineStore('exchange', {
    state: (): IExchangeState => ({ exchangeRateBuy: 0, exchangeRateSell: 0, unsubscribe: null }),
    actions: {
        async getCurrentRates() {
            try {
                const ratesRef = doc(db, collection, docId);
                const snapshot = await getDoc(ratesRef);
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    this.exchangeRateBuy = data.purchase_price;
                    this.exchangeRateSell = data.sale_price;
                }
            }
            catch(except) {}
        },
        listenRates() {
            try {
                const ratesRef = doc(db, collection, docId);
                if (this.unsubscribe) this.unsubscribe();
                this.unsubscribe = onSnapshot(ratesRef, (snapshot) => {
                    const data = snapshot.data();
                    this.exchangeRateBuy = data?.purchase_price;
                    this.exchangeRateSell = data?.sale_price;
                });
            }
            catch(except) {}
        },
        stopRatesListening() {
            try{
                if (this.unsubscribe) {
                    this.unsubscribe();
                    this.unsubscribe = null;
                }
            }
            catch(except) {}
        }
    }
})