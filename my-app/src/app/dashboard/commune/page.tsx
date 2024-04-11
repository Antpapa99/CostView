import styles from '@/app/ui/dashboard.module.css';
import ChartBox from '@/app/ui/dashboard/chartbox';


async function getCommune(commune_name: string) {
    const res = await fetch(`https://tig335-alternativkostnader.onrender.com/commune/${commune_name}`)
    return res.json()
  }


export default async function Page({ children }: { children: React.ReactNode }) {
  const communeData = getCommune('Ale-kommun')
  const [commune] = await Promise.all([communeData])
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-150"> {/* Size of boxes */}
      <h1>{commune.commune_name}</h1>
      

      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}



