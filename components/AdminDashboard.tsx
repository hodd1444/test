'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Users, Coins, Gem, Search, ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import { useTheme } from "next-themes"

const mockUsers = [
  { username: "user1", coins: 100, gems: 50, referrals: 5 },
  { username: "user2", coins: 200, gems: 75, referrals: 3 },
  { username: "user3", coins: 150, gems: 60, referrals: 7 },
  { username: "user4", coins: 300, gems: 100, referrals: 10 },
  { username: "user5", coins: 250, gems: 80, referrals: 6 },
]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const { setTheme, theme } = useTheme()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const filteredUsers = mockUsers.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <span className="font-medium">Admin Name</span>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </header>

      <nav className="bg-card shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <ul className="flex space-x-4">
            {["Dashboard Overview", "Users Management", "Admin Management", "Notifications", "Settings"].map((item) => (
              <li key={item}>
                <Button variant="ghost">{item}</Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Users" value="1,234" icon={<Users className="h-8 w-8" />} />
          <StatCard title="Total Coins" value="56,789" icon={<Coins className="h-8 w-8" />} />
          <StatCard title="Total Gems" value="9,876" icon={<Gem className="h-8 w-8" />} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Coins</TableHead>
                  <TableHead>Gems</TableHead>
                  <TableHead>Referral Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user, index) => (
                  <TableRow key={user.username} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.coins}</TableCell>
                    <TableCell>{user.gems}</TableCell>
                    <TableCell>{user.referrals}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" /> Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function StatCard({ title, value, icon }:any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}