export function SearchResults({ searchResults }) {

  const renderResults = () => {
    let htmlContent;
    if (searchResults && searchResults[0] && searchResults[0].body) {
      htmlContent = searchResults.map((result, index) => <li key={index}><h3 className="search-result flex-row">{result.body}</h3></li>)
    }
    return (
      <div className="search-results">
        {htmlContent}
      </div>
    )
  }

  return (
    <div className="search-results">
      {!searchResults && searchResults !== 0 && <p>No Result Found</p>}
      {searchResults!==undefined && searchResults !== null && <ul>{renderResults({ searchResults })}</ul>}
    </div>
  )
}
