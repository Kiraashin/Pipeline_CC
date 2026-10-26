// import { useState } from 'react'
// import DialogZoomIn from '../Dialog/dialog-26'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion'
// import { Button } from '../../components/ui/button'
// import { useNavigate } from "react-router-dom";
// import { HugeiconsIcon } from "@hugeicons/react"
// import { LoginIcon, Download02Icon, PlusSignIcon, CheckmarkCircle02Icon, DashedLineCircleIcon } from "@hugeicons/core-free-icons"
// import { Input } from '../../components/ui/input'
// import { Label } from '../../components/ui/label'

// const items = [
//   {
//     title: 'Tentukan Peran',
//     content: `Sebelum memulai, kamu mendaftar sebagai peran apa nih (^^). Jangan sampai salah pilih peran yaa (^^)`,
//     icon: (
//       <HugeiconsIcon icon={LoginIcon} strokeWidth={2} />
//     ),
//     label: 'Sign up'
//   },
//   {
//     title: 'Import your data',
//     content: 'Connect your database to the new workspace by using one of 20+ database connectors.',
//     icon: (
//       <HugeiconsIcon icon={Download02Icon} strokeWidth={2} />
//     ),
//     label: 'Import'
//   },
//   {
//     title: 'Create your first report',
//     content: 'Use our drag-and-drop report builder to create your first report and share it with your team.',
//     icon: (
//       <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
//     ),
//     label: 'Create'
//   }
// ]

// function OnboardingFeed() {
//   const [active, setActive] = useState(['item-1'])
//   const [completed, setCompleted] = useState(new Set())
//   const navigate = useNavigate();

//   const handleOpenChange = (val) => {
//     setActive(val)
//   }

//   const handleComplete = (index) => {
//     setCompleted(prev => {
//       const next = new Set(prev)

//       next.add(index)

//       return next
//     })

//     const nextIndex = index + 1

//     if (nextIndex < items.length) {
//       setActive([`item-${nextIndex + 1}`])
//     } else {
//       setActive([])
//     }
//   }

//   return (
//     <Card className='w-full max-w-lg'>
//       <CardHeader>
//         <CardTitle className='leading-none font-semibold'>Halo (nama)</CardTitle>
//         <CardDescription>Konfigurasi dulu yaa sebelum memulai (^^)</CardDescription>
//       </CardHeader>
//       <CardContent className='space-y-4 text-sm'>
//         <Accordion
//           className='w-full space-y-2 overflow-visible border-0 [&>*>[data-slot="accordion-content"]]:px-0'
//           value={active}
//           onValueChange={handleOpenChange}
//         >
//           {items.map((item, index) => {
//             const isCompleted = completed.has(index)

//             return (
//               <AccordionItem key={index} value={`item-${index + 1}`} className='rounded-md border! bg-transparent'>
//                 <AccordionTrigger className='px-5'>
//                   <span className='flex items-center gap-2'>
//                     {isCompleted ? (
//                       <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className='size-4 shrink-0' />
//                     ) : (
//                       <HugeiconsIcon icon={DashedLineCircleIcon} strokeWidth={2} className='size-4 shrink-0' />
//                     )}
//                     <span>{item.title}</span>
//                   </span>
//                 </AccordionTrigger>
//                 <AccordionContent className='text-muted-foreground flex flex-col items-start gap-2 px-5'>
//                   {item.content}
//                   {/* <Button
//                     size='sm'
//                     onClick={() => handleComplete(index)}
//                     disabled={isCompleted || !(index === 0 || completed.has(index - 1))}
//                     className='*:[svg]:size-4 *:[svg]:shrink-0'
//                   >
//                     {item.icon}
//                     {item.label}
//                   </Button> */}

//                 </AccordionContent>
//               </AccordionItem>
//             )
//           })}
//         </Accordion>
//         <div className='flex justify-end gap-2'>
//           <Button className='flex-1 max-sm:w-full' variant='outline'>
//             Cancel
//           </Button>
//           <Button className='flex-1 max-sm:w-full' type='submit' onClick={() => navigate("/home")}>
//             Continue
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// export default OnboardingFeed



import { useState } from 'react'
import DialogZoomIn from '../Dialog/dialog-26'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../../components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../../components/ui/accordion'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { useNavigate } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  LoginIcon,
  BadgePlusIcon,
  CheckmarkCircle02Icon,
  DashedLineCircleIcon
} from '@hugeicons/core-free-icons'

const items = [
  {
    title: 'Tentukan peran kamu',
    content:
      'Pilih salah satu peran ini yang mempunyai tugas nya masing masing yang telah ditentukan',
    icon: <HugeiconsIcon icon={LoginIcon} strokeWidth={2} />,
    label: 'Sign up'
  },
  {
    title: 'Tambahkan saluran kamu',
    content:
      'Tambahkan saluran yang kamu punya untuk memulai mengunggah konten.',
    icon: <HugeiconsIcon icon={BadgePlusIcon} />,
    label: 'Saluran'
  },
  {
    title: 'Buat ide prtama kamu',
    content:
      'Buat ide pertama kamu untuk di unggah pada saluran kamu atau kamu bisa memakai template',
    icon: <HugeiconsIcon icon={BadgePlusIcon} />,
    label: 'Create'
  }
]

function OnboardingFeed() {
  const [active, setActive] = useState(['item-1'])
  const [completed, setCompleted] = useState(new Set())
  const [role, setRole] = useState('')
  const navigate = useNavigate()
  const [selectedSource, setSelectedSource] = useState('Youtube')
  const [selectedReportOption, setSelectedReportOption] = useState('Video pendek')

  const handleOpenChange = (val) => {
    setActive(val)
  }

  const handleComplete = (index) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      next.add(index)
      return next
    })

    const nextIndex = index + 1

    if (nextIndex < items.length) {
      setActive([`item-${nextIndex + 1}`])
    } else {
      setActive([])
    }
  }

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole)

    setCompleted(prev => {
      const next = new Set(prev)
      next.add(0)
      return next
    })

    setActive(['item-2'])
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="leading-none font-semibold">
          Halo (nama)
        </CardTitle>
        <CardDescription>
          Sebelum melanjutkan, konfigurasi terlebih dahulu profil kamu
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        <Accordion
          className='w-full space-y-2 overflow-visible border-0 [&>*>[data-slot="accordion-content"]]:px-0'
          value={active}
          onValueChange={handleOpenChange}
        >
          {items.map((item, index) => {
            const isCompleted = completed.has(index)

            return (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="rounded-md border! bg-transparent"
              >
                <AccordionTrigger className="px-5">
                  <span className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={
                        isCompleted
                          ? CheckmarkCircle02Icon
                          : DashedLineCircleIcon
                      }
                      strokeWidth={2}
                      className="size-4 shrink-0"
                    />
                    <span>{item.title}</span>
                  </span>
                </AccordionTrigger>

                <AccordionContent className="text-muted-foreground flex flex-col items-start gap-2 px-5">
                  {item.content}

                  {index === 0 && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={role === 'Kreator' ? 'default' : 'outline'}
                        className={
                          role === 'Kreator'
                            ? 'border-purple-500 bg-purple-600 text-white hover:bg-purple-700'
                            : ''
                        }
                        onClick={() => handleRoleSelect('Kreator')}
                      >
                        Kreator
                      </Button>

                      <Button
                        size="sm"
                        variant={role === 'Editor' ? 'default' : 'outline'}
                        className={
                          role === 'Editor'
                            ? 'border-purple-500 bg-purple-600 text-white hover:bg-purple-700'
                            : ''
                        }
                        onClick={() => handleRoleSelect('Editor')}
                      >
                        Editor
                      </Button>
                    </div>
                  )}

                  {index === 1 && (
                    <DialogZoomIn
                      title={item.title}
                      description={item.content}
                      buttonLabel={item.label}
                      icon={item.icon}
                      disabled={!completed.has(0) || isCompleted}
                      onSave={(formData) => {
                        console.log({
                          sourceType: selectedSource,
                          host: formData.get('host'),
                          database: formData.get('database')
                        })

                        handleComplete(index)
                      }}
                    >
                      <div className="grid gap-4">
                        <div className="grid grid-cols-3 gap-2">
                          {['Youtube', 'Instagram', 'Tiktok'].map((source) => (
                            <Button
                              key={source}
                              type="button"
                              size="sm"
                              variant={
                                selectedSource === source ? 'default' : 'outline'
                              }
                              className={
                                selectedSource === source
                                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                                  : ''
                              }
                              onClick={() => setSelectedSource(source)}
                            >
                              {source}
                            </Button>
                          ))}
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="import-host">Tautan Saluran</Label>
                          <Input
                            id="import-host"
                            name="host"
                            placeholder="https://www.youtube.com/channel/UCX6OQ3DkcsbYNE6H8uQQuVA"
                            required
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="import-database">Nama Saluran</Label>
                          <Input
                            id="import-database"
                            name="database"
                            placeholder="MrBeast"
                            required
                          />
                        </div>
                      </div>
                    </DialogZoomIn>
                  )}
                 
                    {index === 2 && (
                      <DialogZoomIn
                        title={item.title}
                        description={item.content}
                        buttonLabel={item.label}
                        icon={item.icon}
                        disabled={!completed.has(1) || isCompleted}
                        onSave={(formData) => {
                          console.log({
                            reportName: formData.get('reportName'),
                            targetAudience: formData.get('targetAudience'),
                            description: formData.get('description'),
                            reportType: selectedReportOption
                          })

                          handleComplete(index)
                        }}
                      >
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="report-name">Judul konten</Label>
                            <Input
                              id="report-name"
                              name="reportName"
                              placeholder="Tutorial bikin konten"
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="report-audience">Ringkasan konsep singkat</Label>
                            <Input
                              id="report-audience"
                              name="targetAudience"
                              placeholder="Tutorial berisi tentang tips untuk bikin konten menarik"
                              required
                            />
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="report-description">Naskah konten</Label>
                            <Textarea
                              id="report-description"
                              name="description"
                              placeholder="Tutorial ini dipaparkan langsung oleh ahli pembuat konten dengan materi full daging"
                              required
                            />
                          </div>

                          <div className="grid gap-2">
                            <Label>Format Konten</Label>

                            <div className="grid grid-cols-2 gap-2">
                              {['Video pendek', 'Video panjang', 'Postingan', 'Status'].map((option) => (
                                <Button
                                  key={option}
                                  type="button"
                                  variant={
                                    selectedReportOption === option ? 'default' : 'outline'
                                  }
                                  className={
                                    selectedReportOption === option
                                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                                      : ''
                                  }
                                  onClick={() => setSelectedReportOption(option)}
                                >
                                  {option}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogZoomIn>
                    )}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        <div className="flex justify-end gap-2">
          <Button
            className="flex-1 max-sm:w-full"
            variant="outline"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>

          <Button
            className="flex-1 max-sm:w-full"
            onClick={() => navigate('/home')}
            disabled={completed.size < items.length || !role}
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default OnboardingFeed
