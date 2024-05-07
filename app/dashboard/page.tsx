import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, countInvoices, sumInvoicesByStatus, countCustomers } from '@/app/lib/data';

export default async function Page(){

    const data = await Promise.all([
        countInvoices(),
        sumInvoicesByStatus('paid'),
        sumInvoicesByStatus('pending'),
        countCustomers(),
        fetchRevenue(),
        fetchLatestInvoices()
      ]);
      
    return(
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2x1`}>
                Dashboard
            </h1>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                <Card title="Collected" value={data[1]} type="collected" />
                <Card title="Pending" value={data[2]} type="pending" />
                <Card title="Total Invoices" value={data[0]} type="invoices" />
                <Card
                    title="Total Customers"
                    value={data[3]}
                    type="customers"
                />
            </div>
            <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
                <RevenueChart revenue={data[4]} />
                <LatestInvoices latestInvoices={data[5]} />
            </div>
        </main>
    )
}