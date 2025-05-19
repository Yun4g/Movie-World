import DashBoardNavbar from "./dashbordNav"




export default function DashboardLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <main className= "flex min-h-screen flex-col items-center   bg-gray-950">
            <div className= "w-full p-2 bg-gray-900 shadow-md shadow-gray-700">
                <DashBoardNavbar/>
            </div>
            {children}
        </main>
    )
}
