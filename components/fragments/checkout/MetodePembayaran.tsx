import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

interface MetodePembayaranFragmentsProps {
  nama: string
  gambar: string
  isSelected?: boolean
  onSelect?: () => void
}

const MetodePembayaranFragments = ({ nama, gambar, isSelected, onSelect }: MetodePembayaranFragmentsProps) => {
  return (
    <div className='flex flex-col md:flex-row items-center md:justify-between'>
      <RadioGroup
        value={isSelected ? "selected" : "not-selected"} // Kontrol nilai
        onValueChange={onSelect} // Tangani perubahan
        className='flex space-x-6 mt-1'
      >
        <div className='flex items-center space-x-2'>
          <RadioGroupItem
            value='selected' // Nilai unik untuk item ini
            id={nama} // Gunakan nama sebagai ID unik
          />
          <Label
            htmlFor={nama}
            className='text-[12px] text-color-primary font-medium'
          >
            {nama}
          </Label>
        </div>
      </RadioGroup>
      <Image
        src={gambar}
        alt={nama.toLowerCase()}
        className='w-1/2 max-w-[100px] mt-3 h-12'
      />
    </div>
  )
}

export default MetodePembayaranFragments
