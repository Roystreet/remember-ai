export default function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`gradient-button w-full rounded-full px-5 py-3.5 text-[15px] font-semibold tracking-tight ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
