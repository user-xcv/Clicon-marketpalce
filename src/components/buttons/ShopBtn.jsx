import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const ShopBtn = ({ className = '', onClick }) => {
    const { t } = useTranslation()

    return (
        <div
            // onClick mana bu yerga qo'shilishi kerak!
            onClick={onClick}
            className={`group flex items-center gap-2 cursor-pointer justify-center
                        transition duration-150 hover:bg-amber-600
                        ${className}`}
        >
            <p className="font-semibold">{t('ShopBtn')}</p>

            <ArrowRight
                className="transition-transform duration-150 group-hover:translate-x-1"
            />
        </div>
    )
}

export default ShopBtn