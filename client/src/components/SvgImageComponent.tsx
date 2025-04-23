import { Img } from 'react-image'

const SvgImageComponent = () => {
  const svgImageUrl = '/payment.svg';
  return (
    <div>
        <Img 
            src={svgImageUrl}
            alt='banner'
            loader={<div>Loading...</div>}
        />
    </div>
  )
}

export default SvgImageComponent