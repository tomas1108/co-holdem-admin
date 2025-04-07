import { RoomsClient } from './_components/client'

const Rooms = () => {
  return (
    <div className="h-full flex-col">
      <div className="flex0 h-full flex-1 space-y-4 p-8 pt-6">
        <RoomsClient />
      </div>
    </div>
  )
}

export default Rooms
