import { Link } from "./Link";
import { Node } from "./Node";

export interface Graph {
    links: Link[];
    nodes: Node[];
}
