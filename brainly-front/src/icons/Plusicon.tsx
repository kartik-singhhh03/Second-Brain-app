export function PlusIcon() {
  return (
    <svg
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"   // ✅ camelCase
      className="size-5"
    >
      <path
        strokeLinecap="round"   // ✅ camelCase
        strokeLinejoin="round"  // ✅ camelCase
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}
