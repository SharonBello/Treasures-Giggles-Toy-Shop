import { ToyPreview } from "./toy-preview.jsx"

export function ToyList({ toys, onRemoveToy, handleRatingChange, username }) {
    return (

        <ul className="toy-list clean-list">
            {toys.map(toy =>
                <ToyPreview
                    key={toy._id}
                    toy={toy}
                    onRemoveToy={onRemoveToy}
                    handleRatingChange={handleRatingChange}
                    username={username}
                />
            )}
        </ul>
    )
}