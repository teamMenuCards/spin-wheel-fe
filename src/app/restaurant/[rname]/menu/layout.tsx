import DashboardLayout from "./dashboard-layout"

interface Props {
	children: React.ReactNode
}

export default function Layout({ children }: Props) {
	return <DashboardLayout>{children}</DashboardLayout>
}
