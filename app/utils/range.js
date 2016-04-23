export default function * (begin, end, inteval=1) {
    for (let i = begin; i < end; i += inteval) {
        yield i
    }
}
