// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				id: number;
				email: string;
				name: string;
				pricingPlan: string;
				emailVerified: boolean;
			} | null;
			session: {
				id: string;
				expiresAt: Date;
				userId: number;
			} | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
