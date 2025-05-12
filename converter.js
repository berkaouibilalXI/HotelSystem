import { convertTsxToJsx } from 'tsx-to-jsx'

const srcDirectory= "./"
const destDirectory = "./projectJSXFiles"

await convertTsxToJsx(srcDirectory,destDirectory)
