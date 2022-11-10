import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import walletImage from '../../assets/images/landingPage/wallet.png'
import exchangeImage from '../../assets/images/landingPage/exchange.png'
import manageAssetsImage from '../../assets/images/landingPage/manage-assets.png'
import newAssetsImage from '../../assets/images/landingPage/new-assets.png'
import sendAlgoImage from '../../assets/images/landingPage/send-algo.png'
import walletSetupImage from '../../assets/images/landingPage/wallet-setup.png'

const images = [
  walletSetupImage,
  walletImage,
  sendAlgoImage,
  manageAssetsImage, 
  newAssetsImage,
  exchangeImage
]

function MyCarousel({ selectedItem }) {
  return (
    <div>
      <Carousel 
        autoPlay
        infiniteLoop
        selectedItem={selectedItem}
      >
        { images.map((image, i) => (
          <img src={image} alt="" key={i} />
        ))}
      </Carousel>
    </div>
  )
}

export default MyCarousel