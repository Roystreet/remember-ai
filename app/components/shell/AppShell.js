import TopBar from "./TopBar";
import BottomNav from "./BottomNav";

export default function AppShell({ title, activeTab, children }) {
  return (
    <div className="w-full min-h-dvh flex justify-center px-3 py-0 md:py-6">
      <div className="phone-shell flex flex-col md:rounded-[34px] md:overflow-hidden">
        <TopBar title={title} />
        <main className="flex-1 px-5 pb-4 bg-white">{children}</main>
        <BottomNav activeTab={activeTab} />
      </div>
    </div>
  );
}
