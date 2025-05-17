import MapLocationPreview from './MapLocationPreview'
import { MapIcon, Watch} from 'lucide-react'

const LocationSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="hotel-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-hotel-800 dark:text-white mb-4">Our Location</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Conveniently located in the heart of downtown, just minutes away from major attractions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-hotel-100 dark:bg-hotel-800 p-3 rounded-full text-hotel-600 dark:text-hotel-400 flex-shrink-0">
                  <MapIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1 text-hotel-800 dark:text-white">Address</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    69 Rue Afroul Mohammed<br />
                    Oran City, 31001<br />
                    Algeria
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-hotel-100 dark:bg-hotel-800 p-3 rounded-full text-hotel-600 dark:text-hotel-400 flex-shrink-0">
                  <Watch className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1 text-hotel-800 dark:text-white">Nearby Attractions</h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• City Center (5 min walk)</li>
                    <li>• Beach Promenade (10 min walk)</li>
                    <li>• Shopping District (7 min walk)</li>
                    <li>• Historical Museum (15 min walk)</li>
                    <li>• International Airport (20 min drive)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <MapLocationPreview />
          </div>
        </div>
      </section>
  )
}

export default LocationSection