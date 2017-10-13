export const NETWORK_CHANGE = 'network/change'

export function setConnectivity(status) {
	return {
		type: NETWORK_CHANGE,
		payload: {
			isOnline: status
		}
	}
}