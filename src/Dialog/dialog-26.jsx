// import { Button } from '@/components/ui/button'
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger
// } from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'

// const DialogZoomIn = () => {
//   return (
//     <Dialog>
//       <form>
//         <DialogTrigger render={<Button variant='outline' />}>Zoom in</DialogTrigger>
//         <DialogContent className='data-open:zoom-in-0! data-open:duration-600 sm:max-w-106.25'>
//           <DialogHeader>
//             <DialogTitle>Edit profile</DialogTitle>
//             <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
//           </DialogHeader>
//           <div className='grid gap-4'>
//             <div className='grid gap-3'>
//               <Label htmlFor='name-1'>Name</Label>
//               <Input id='name-1' name='name' defaultValue='Pedro Duarte' />
//             </div>
//             <div className='grid gap-3'>
//               <Label htmlFor='username-1'>Username</Label>
//               <Input id='username-1' name='username' defaultValue='@peduarte' />
//             </div>
//           </div>
//           <DialogFooter>
//             <DialogClose render={<Button variant='outline' />}>Cancel</DialogClose>
//             <Button type='submit'>Save changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//   )
// }

// export default DialogZoomIn


// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger
// } from '../../components/ui/dialog'
// import { Button } from '../../components/ui/button'
// import { Input } from '../../components/ui/input'
// import { Label } from '../../components/ui/label'

// const DialogZoomIn = ({ onSave }) => {
//   return (
//     <Dialog>
//       <DialogTrigger render={<Button size="sm" />}>
//         Sign up
//       </DialogTrigger>

//       <DialogContent className="data-open:zoom-in-0! data-open:duration-600 sm:max-w-106.25">
//         <DialogHeader>
//           <DialogTitle>Create an account</DialogTitle>
//           <DialogDescription>
//             Enter your details to create your account.
//           </DialogDescription>
//         </DialogHeader>

//         <form
//           onSubmit={(e) => {
//             e.preventDefault()
//             onSave?.(new FormData(e.currentTarget))
//           }}
//         >
//           <div className="grid gap-4">
//             <div className="grid gap-3">
//               <Label htmlFor="signup-name">Name</Label>
//               <Input
//                 id="signup-name"
//                 name="name"
//                 placeholder="Enter your name"
//                 required
//               />
//             </div>

//             <div className="grid gap-3">
//               <Label htmlFor="signup-email">Email</Label>
//               <Input
//                 id="signup-email"
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             <div className="grid gap-3">
//               <Label htmlFor="signup-password">Password</Label>
//               <Input
//                 id="signup-password"
//                 name="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>
//           </div>

//           <DialogFooter className="mt-4">
//             <DialogClose render={<Button variant="outline" type="button" />}>
//               Cancel
//             </DialogClose>

//             <Button type="submit">Create account</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default DialogZoomIn


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'

const DialogZoomIn = ({
  title,
  description,
  buttonLabel,
  icon,
  children,
  onSave,
  disabled = false
}) => {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            size="sm"
            disabled={disabled}
            className="*:[svg]:size-4 *:[svg]:shrink-0"
          />
        }
      >
        {icon}
        {buttonLabel}
      </DialogTrigger>

      <DialogContent className="data-open:zoom-in-0! data-open:duration-600 sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSave?.(new FormData(e.currentTarget))
          }}
        >
          {children}

          <DialogFooter className="mt-4">
            <DialogClose
              render={<Button variant="outline" type="button" />}
            >
              Cancel
            </DialogClose>
            <Button type="submit">Continue</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogZoomIn
