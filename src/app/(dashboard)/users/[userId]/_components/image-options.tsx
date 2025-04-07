import Image from 'next/image'

interface ImageOptionProps {
  imageUrl: string
  onClick?: () => void
  index: number
}

export const ImageOption = ({ imageUrl, onClick, index }: ImageOptionProps) => {
  return (
    <div className="group_item">
      <label onClick={onClick}>
        <div className="images">
          <div className="aspect-square ">
            <Image
              src={imageUrl}
              alt="image alt"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          </div>
        </div>
      </label>
    </div>
  )
}
