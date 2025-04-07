'use client'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import settingApi from '@/services/api/modules/setting-api'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface SettingProps {
  id?: string
  fee: number
}

const SettingsPage = () => {
  const [saving, setSaving] = useState<boolean>(false)
  const [settings, setSettings] = useState<SettingProps>({ id: '', fee: 0 })

  // Fetch settings data from API
  const fetchSettings = async () => {
    try {
      const data = await settingApi.getSettings()
      if (data) {
        setSettings({
          id: data.settings?.id,
          fee: data.settings?.serviceFeeRate
            ? Number((data.settings.serviceFeeRate * 100).toFixed(1)) // Làm tròn đúng 1 chữ số
            : 0,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }
  

  // Call fetchSettings when the component mounts
  useEffect(() => {
    fetchSettings()
  }, [])

  // Save settings function
  const onSaveSettings = async () => {
    try {
      setSaving(true)
      if (!settings.id) {
        const updatedSettings = await settingApi.createSettings(settings)
        if (updatedSettings.setting) {
          toast.success('Settings created successfully!')
        }
        setSaving(false)
        return
      }
      const createdSettings = await settingApi.updateSettings(settings)
      if (createdSettings.setting) {
        toast.success('Settings updated successfully!')
      }
      setSaving(false)
      return
    } catch (err) {
      console.error(err)
      setSaving(false)
    }
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title={`Settings`} description="Game settings" />
        </div>
        <Separator />

        <div className="mt-10">
          {/* <h2 className="text-xl font-bold tracking-tight">
            IP Management (Coming Soon)
          </h2> */}
        </div>

        <div className="mt-24">
          <h2 className="text-xl font-bold tracking-tight">
            Service Fee
          </h2>

          <div className="grid grid-cols-1 grid-cols-3 gap-2">
            <div className="mt-3 flex flex-col gap-2">
              <Label>Fee (0-10  %)</Label>
              <Input
    placeholder="Fee"
    type="number"
    min={0}
    max={10}
    step="0.1" // Cho phép nhập số có 1 chữ số thập phân
    value={settings.fee.toFixed(1)} // Hiển thị đúng 1 chữ số thập phân
    onChange={e =>
      setSettings({ ...settings, fee: Number(parseFloat(e.target.value).toFixed(1)) })
    }
  />
            </div>
            <div className="flex items-end">
              <Button
                disabled={saving}
                type="submit"
                onClick={() => onSaveSettings()}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
