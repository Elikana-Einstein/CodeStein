import { Folder } from 'lucide-react'
import React from 'react'
import FolderStructure from '../components/ui/FolderStructure'
import Vscode from '../pages/Vscode'

const VascodeLayout = () => {
  return (
    <div className='flex gap-4 p-4 md:flex-row flex-col sm:gap-2'>
        <div className='lg:w-1/4 md:w-1/3 sm:w-full'>
        <FolderStructure/>

        </div>
        <Vscode/>
    </div>
  )
}

export default VascodeLayout