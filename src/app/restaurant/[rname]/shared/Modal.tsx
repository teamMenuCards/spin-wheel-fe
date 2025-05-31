const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
	return (
		<div
			className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg shadow-lg w-full max-w-sm p-4 sm:mx-auto"
				onClick={(e) => e.stopPropagation()} // prevent modal content click from closing
			>
				<div className="flex justify-end">
					<button
						className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center"
						onClick={onClose}
					>
						✕
					</button>
				</div>
				<div className="mt-2">
					{children}
				</div>
			</div>
		</div>
	)
}

export default Modal
