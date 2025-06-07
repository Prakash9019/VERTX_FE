const CopyrightText = () => {
const currentYear = new Date().getFullYear();
  return (
    <div className="text-gray-500 text-sm ml-2 max-sm:text-xs">
        © {currentYear}  Vertex Labs. All rights reserved.
    </div>
  )
}

export default CopyrightText