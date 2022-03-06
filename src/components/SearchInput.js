import './SearchInput.css';

const SearchInput = props => {
  return (
    <div class="input-field-icon">
      <label>
        <span class="icon small">
          <i class="bi bi-search"></i>
        </span>
        <input placeholder="Search" type="search" />
      </label>
    </div>
  );
};
export default SearchInput;
