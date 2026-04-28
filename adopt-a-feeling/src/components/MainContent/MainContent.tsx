import FeelingForm from "../form/FeelingForm";
import MonsterArea from "../monsterArea/MonsterArea";
import { useState } from "react";
export default function MainContent() {
    const [monster, setMonster] = useState<string>('');
    return (
        <main>
            <FeelingForm setMonster={setMonster} />
            <MonsterArea monster={monster} />
        </main>
    );
}