import { BaseGeneratorService } from "src/features/components/base-generator/base-generation-service";
import { Metal } from "src/types/metal/Metal";


export class MetalGeneratorService extends BaseGeneratorService {
	GENERATE_NOTE_HIDDEN = true;
  
	generateItem(): Metal {
		const suffixes = ["sium", "cium", "lium", "rium", "trium", "tium", "nese", "nium", "sten", "nor", "tine", "ntine", "rhil", "thil", "nyx", "dian","ium", "ese", "alt", "um", "ian", "il", "ine", "yx", "ite"];
		const syllables = ["zor", "lyn", "kae", "vel", "dris", "ris", "lin", "mal", "zet", "ver", "cor", "ron", "ten", "tan", "del", "per"];
	
		let name = "";
		const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
		const syllablesCount = Math.floor(Math.random() * 2) + 1;
	
		for (let i = 0; i < syllablesCount; i++) {
			name += syllables[Math.floor(Math.random() * syllables.length)];
		}
	
		return new Metal(name[0].toUpperCase() + name.slice(1) + suffix);
	}
}
