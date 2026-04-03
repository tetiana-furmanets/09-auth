// src/components/app

const [page, setPage] = useState(1);
const [search, setSearch] = useState("");
const [isOpen, setIsOpen] = useState(false);

const { data, isLoading } = useQuery({
  queryKey: ["notes", page, search],
  queryFn: () => fetchNotes(page, search),
});

const updateSearch = useDebouncedCallback((value: string) => {
  setSearch(value);
}, 300);


