export default function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`gradient-button w-full rounded-full px-5 py-3 font-semibold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

