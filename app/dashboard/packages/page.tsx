import { prisma } from "@/lib/prisma"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { price: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Package Management</h1>
        <Button>Add Package</Button>
      </div>

      <div className="rounded-md border bg-white dark:bg-slate-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Speed (Mbps)</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Radius Profile</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No packages found.
                </TableCell>
              </TableRow>
            ) : (
              packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell>{pkg.speed}</TableCell>
                  <TableCell>Rp {pkg.price.toLocaleString('id-ID')}</TableCell>
                  <TableCell>{pkg.profile}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
