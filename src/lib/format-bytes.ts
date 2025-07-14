/**
 * Converts a number of bytes into a human-readable string representation
 * @param bytes - The number of bytes to format
 * @param decimals - Number of decimal places to show (default: 2)
 * @param binary - Use binary (1024) or decimal (1000) units (default: false for decimal)
 * @returns A formatted string like "1.23 KB", "4.56 MB", etc.
 */
export function formatBytes(
	bytes: number,
	decimals: number = 2,
	binary: boolean = false
): string {
	// Handle edge cases
	if (bytes === 0) return '0 Bytes';
	if (bytes < 0) return '-' + formatBytes(-bytes, decimals, binary);

	// Define units
	const units = binary
		? ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
		: ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	// Calculate the base (1024 for binary, 1000 for decimal)
	const base = binary ? 1024 : 1000;

	// Calculate which unit to use
	const unitIndex = Math.floor(Math.log(bytes) / Math.log(base));

	// Clamp to available units
	const clampedIndex = Math.min(unitIndex, units.length - 1);

	// Calculate the value
	const value = bytes / Math.pow(base, clampedIndex);

	// Format the number
	const formattedValue = clampedIndex === 0
		? Math.round(value).toString() // Don't show decimals for bytes
		: value.toFixed(decimals);

	return `${formattedValue} ${units[clampedIndex]}`;
}

/**
 * Convenience function for binary units (1024-based)
 */
export function formatBytesB(bytes: number, decimals: number = 2): string {
	return formatBytes(bytes, decimals, true);
}

/**
 * Convenience function for decimal units (1000-based)
 */
export function formatBytesD(bytes: number, decimals: number = 2): string {
	return formatBytes(bytes, decimals, false);
}

// Example usage:
// formatBytes(1024) → "1.02 KB"
// formatBytesB(1024) → "1.00 KiB"
// formatBytes(1500000) → "1.50 MB"
// formatBytesB(1500000) → "1.43 MiB"
