import TopBar from "./TopBar";
import BottomNav from "./BottomNav";

export default function AppShell({ title, activeTab, children }) {
  return (
    <div className="w-full min-h-dvh flex justify-center">
      <div className="phone-shell flex flex-col">
        <TopBar title={title} />
        <main className="flex-1 px-5 pb-4">{children}</main>
        <BottomNav activeTab={activeTab} />
      </div>
    </div>
  );
}

