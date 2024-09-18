import DetailSection from '../presentation/modules/DetailSection'
import Footer from '../presentation/shared/layout/Footer'

interface ProductProps {
  params: {
    id: string
  }
}

export default function InfoPage({ params }: ProductProps) {
  return (
    <>
      <DetailSection params={{ id: params.id }} />
      <Footer />
    </>
  )
}
