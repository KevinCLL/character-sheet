// store/index.js
import { createStore } from 'vuex';

// Constantes para valores por defecto
const DEFAULT_ATTRIBUTES = {
  intelligence: 1,
  wits: 1,
  resolve: 1,
  presence: 1,
  manipulation: 1,
  composure: 1
};

const DEFAULT_PHYSICAL_ATTRIBUTES = {
  strength: 1,
  dexterity: 1,
  stamina: 1
};

const DEFAULT_DERIVED_STATS = {
  size: 5,
  speed: 5,
  defense: 0,
  armor: 0,
  initiative: 0,
  health: 6
};

// Helper function to ensure the store state is properly initialized
const ensureStoreState = (state) => {
  // Make sure EGO object exists
  if (!state.ego) {
    state.ego = {
      name: '',
      mentalAge: '',
      attributes: { ...DEFAULT_ATTRIBUTES },
      skills: {
        mental: [],
        physical: [],
        social: []
      },
      traits: [],
      dualCharacteristics: {
        personal: {
          left: 'Idealismo',
          right: 'Cinismo',
          value: 5
        },
        moral: {
          left: '',
          right: '',
          value: 5
        }
      }
    };
  }

  // Make sure EGO attributes exist
  if (!state.ego.attributes) {
    state.ego.attributes = { ...DEFAULT_ATTRIBUTES };
  }

  // Make sure EGO skills exist and are arrays
  if (!state.ego.skills) {
    state.ego.skills = {
      mental: [],
      physical: [],
      social: []
    };
  }

  // Make sure each skill category exists and is an array
  ['mental', 'physical', 'social'].forEach(category => {
    if (!state.ego.skills[category] || !Array.isArray(state.ego.skills[category])) {
      state.ego.skills[category] = [];
    }
  });

  // Make sure EGO traits exist
  if (!state.ego.traits || !Array.isArray(state.ego.traits)) {
    state.ego.traits = [];
  }

  // Make sure EGO dual characteristics exist
  if (!state.ego.dualCharacteristics) {
    state.ego.dualCharacteristics = {
      personal: {
        left: 'Idealismo',
        right: 'Cinismo',
        value: 5
      },
      moral: {
        left: '',
        right: '',
        value: 5
      }
    };
  }

  // Make sure MORFOs array exists
  if (!state.morfos || !Array.isArray(state.morfos) || state.morfos.length === 0) {
    state.morfos = [{
      id: 1,
      name: '',
      physicalAge: '',
      nature: '',
      attributes: { ...DEFAULT_PHYSICAL_ATTRIBUTES },
      skillLimits: {
        'Atletismo': 0,
        'Pelea': 0,
        'Conducir': 0,
        'Armas de Fuego': 0,
        'Hurto': 0,
        'Sigilo': 0,
        'Supervivencia': 0,
        'Armas Blancas': 0
      },
      derivedStats: { ...DEFAULT_DERIVED_STATS },
      powers: [],
      equipment: [],
      weapons: [],
      dualCharacteristic: {
        left: 'Humanidad',
        right: 'Corrupción',
        value: 5
      }
    }];
    
    // Set active MORFO
    state.activeMorfoId = 1;
  }

  // Make sure AVATAR exists
  if (!state.avatar) {
    state.avatar = {
      player: '',
      concept: '',
      virtue: '',
      vice: '',
      willpower: {
        max: 5,
        current: 5
      },
      integrity: {
        value: 7
      },
      synchronization: {
        value: 3,
        effect: ''
      },
      conditions: [],
      notes: ''
    };
  }

  // Make sure history exists
  if (!state.history) {
    state.history = {
      background: '',
      relationships: [],
      goals: [],
      notes: ''
    };
  }
};

// Helper function to manage dynamic collections with error handling
const createDynamicItemMutations = (state, path, payload) => {
  try {
    const { action, index, item, field, value } = payload;
    
    const parts = path.split('.');
    let target = state;
    for (const part of parts) {
      if (!target[part]) {
        target[part] = part === parts[parts.length - 1] ? [] : {};
      }
      target = target[part];
    }
    
    switch(action) {
      case 'add':
        target.push(item);
        break;
      case 'remove':
        if (index >= 0 && index < target.length) {
          target.splice(index, 1);
        }
        break;
      case 'update':
        if (field) {
          if (!target[index]) target[index] = {};
          target[index][field] = value;
        } else {
          target[index] = value;
        }
        break;
      default:
        throw new Error(`Acción no válida: ${action}`);
    }
  } catch (error) {
    console.error('Error en createDynamicItemMutations:', error);
    throw error;
  }
};

// Create and export the Vuex store
export default createStore({
  state() {
    const initialState = {
      ego: {
        name: '',
        mentalAge: '',
        attributes: { ...DEFAULT_ATTRIBUTES },
        skills: {
          mental: [
            { name: 'Académicas', value: 0, specialty: '' },
            { name: 'Informática', value: 0, specialty: '' },
            { name: 'Artesanía', value: 0, specialty: '' },
            { name: 'Investigación', value: 0, specialty: '' },
            { name: 'Medicina', value: 0, specialty: '' },
            { name: 'Ocultismo', value: 0, specialty: '' },
            { name: 'Política', value: 0, specialty: '' },
            { name: 'Ciencia', value: 0, specialty: '' }
          ],
          physical: [
            { name: 'Atletismo', value: 0, specialty: '' },
            { name: 'Pelea', value: 0, specialty: '' },
            { name: 'Conducir', value: 0, specialty: '' },
            { name: 'Armas de Fuego', value: 0, specialty: '' },
            { name: 'Hurto', value: 0, specialty: '' },
            { name: 'Sigilo', value: 0, specialty: '' },
            { name: 'Supervivencia', value: 0, specialty: '' },
            { name: 'Armas Blancas', value: 0, specialty: '' }
          ],
          social: [
            { name: 'Trato con Animales', value: 0, specialty: '' },
            { name: 'Empatía', value: 0, specialty: '' },
            { name: 'Expresión', value: 0, specialty: '' },
            { name: 'Intimidación', value: 0, specialty: '' },
            { name: 'Persuasión', value: 0, specialty: '' },
            { name: 'Sociabilidad', value: 0, specialty: '' },
            { name: 'Callejeo', value: 0, specialty: '' },
            { name: 'Subterfugio', value: 0, specialty: '' }
          ]
        },
        traits: [
          { name: '', value: 0 },
          { name: '', value: 0 },
          { name: '', value: 0 },
          { name: '', value: 0 }
        ],
        dualCharacteristics: {
          personal: {
            left: 'Idealismo',
            right: 'Cinismo',
            value: 5
          },
          moral: {
            left: '',
            right: '',
            value: 5
          }
        }
      },
      morfos: [],
      activeMorfoId: null,
      avatar: {
        player: '',
        concept: '',
        virtue: '',
        vice: '',
        willpower: {
          max: 5,
          current: 5
        },
        integrity: {
          value: 7
        },
        synchronization: {
          value: 3,
          effect: ''
        },
        conditions: [],
        notes: ''
      },
      history: {
        background: '',
        relationships: [],
        goals: [],
        notes: ''
      }
    };

    ensureStoreState(initialState);
    return initialState;
  },

  mutations: {
    updateEgo(state, { path, value }) {
      try {
        const parts = path.split('.');
        let target = state.ego;
        for (let i = 0; i < parts.length - 1; i++) {
          target = target[parts[i]];
        }
        target[parts[parts.length - 1]] = value;
      } catch (error) {
        console.error('Error en updateEgo:', error);
        throw error;
      }
    },

    addMorfo(state, morfoData = {}) {
      try {
        const newMorfo = {
          id: state.morfos.length + 1,
          name: '',
          physicalAge: '',
          nature: '',
          attributes: { ...DEFAULT_PHYSICAL_ATTRIBUTES },
          skillLimits: {
            'Atletismo': 0,
            'Pelea': 0,
            'Conducir': 0,
            'Armas de Fuego': 0,
            'Hurto': 0,
            'Sigilo': 0,
            'Supervivencia': 0,
            'Armas Blancas': 0
          },
          derivedStats: { ...DEFAULT_DERIVED_STATS },
          powers: [],
          equipment: [],
          weapons: [],
          dualCharacteristic: {
            left: 'Humanidad',
            right: 'Corrupción',
            value: 5
          },
          ...morfoData
        };
        state.morfos.push(newMorfo);
        state.activeMorfoId = newMorfo.id;
      } catch (error) {
        console.error('Error en addMorfo:', error);
        throw error;
      }
    },

    removeMorfo(state, morfoId) {
      try {
        const index = state.morfos.findIndex(m => m.id === morfoId);
        if (index !== -1) {
          state.morfos.splice(index, 1);
          if (state.activeMorfoId === morfoId) {
            state.activeMorfoId = state.morfos.length > 0 ? state.morfos[0].id : null;
          }
        }
      } catch (error) {
        console.error('Error en removeMorfo:', error);
        throw error;
      }
    },

    setActiveMorfo(state, morfoId) {
      try {
        if (state.morfos.some(m => m.id === morfoId)) {
          state.activeMorfoId = morfoId;
        }
      } catch (error) {
        console.error('Error en setActiveMorfo:', error);
        throw error;
      }
    },

    updateMorfo(state, { morfoId, path, value }) {
      try {
        const morfo = state.morfos.find(m => m.id === morfoId);
        if (morfo) {
          const parts = path.split('.');
          let target = morfo;
          for (let i = 0; i < parts.length - 1; i++) {
            target = target[parts[i]];
          }
          target[parts[parts.length - 1]] = value;
        }
      } catch (error) {
        console.error('Error en updateMorfo:', error);
        throw error;
      }
    },

    updateAvatar(state, { path, value }) {
      try {
        const parts = path.split('.');
        let target = state.avatar;
        for (let i = 0; i < parts.length - 1; i++) {
          target = target[parts[i]];
        }
        target[parts[parts.length - 1]] = value;
      } catch (error) {
        console.error('Error en updateAvatar:', error);
        throw error;
      }
    },

    updateHistory(state, { path, value }) {
      try {
        const parts = path.split('.');
        let target = state.history;
        for (let i = 0; i < parts.length - 1; i++) {
          target = target[parts[i]];
        }
        target[parts[parts.length - 1]] = value;
      } catch (error) {
        console.error('Error en updateHistory:', error);
        throw error;
      }
    },

    loadCharacterData(state, data) {
      try {
        if (!data) return;
        
        // Ensure the data structure is valid
        ensureStoreState(data);
        
        // Update state with loaded data
        Object.keys(data).forEach(key => {
          if (state[key]) {
            state[key] = data[key];
          }
        });
      } catch (error) {
        console.error('Error en loadCharacterData:', error);
        throw error;
      }
    }
  },

  actions: {
    loadCharacter({ commit }, data) {
      try {
        commit('loadCharacterData', data);
      } catch (error) {
        console.error('Error en loadCharacter:', error);
        throw error;
      }
    },

    addSkill({ commit }, { category, name = '' }) {
      try {
        commit('updateEgo', {
          path: `skills.${category}`,
          value: [...state.ego.skills[category], { name, value: 0, specialty: '' }]
        });
      } catch (error) {
        console.error('Error en addSkill:', error);
        throw error;
      }
    },

    removeSkill({ commit }, { category, index }) {
      try {
        const skills = [...state.ego.skills[category]];
        skills.splice(index, 1);
        commit('updateEgo', {
          path: `skills.${category}`,
          value: skills
        });
      } catch (error) {
        console.error('Error en removeSkill:', error);
        throw error;
      }
    },

    updateSkill({ commit }, { category, index, field, value }) {
      try {
        const skills = [...state.ego.skills[category]];
        skills[index] = { ...skills[index], [field]: value };
        commit('updateEgo', {
          path: `skills.${category}`,
          value: skills
        });
      } catch (error) {
        console.error('Error en updateSkill:', error);
        throw error;
      }
    },

    addTrait({ commit }) {
      try {
        commit('updateEgo', {
          path: 'traits',
          value: [...state.ego.traits, { name: '', value: 0 }]
        });
      } catch (error) {
        console.error('Error en addTrait:', error);
        throw error;
      }
    },

    removeTrait({ commit }, index) {
      try {
        const traits = [...state.ego.traits];
        traits.splice(index, 1);
        commit('updateEgo', {
          path: 'traits',
          value: traits
        });
      } catch (error) {
        console.error('Error en removeTrait:', error);
        throw error;
      }
    },

    addNewMorfo({ commit }, morfoData) {
      try {
        commit('addMorfo', morfoData);
      } catch (error) {
        console.error('Error en addNewMorfo:', error);
        throw error;
      }
    },

    deleteMorfo({ commit }, morfoId) {
      try {
        commit('removeMorfo', morfoId);
      } catch (error) {
        console.error('Error en deleteMorfo:', error);
        throw error;
      }
    },

    switchMorfo({ commit }, morfoId) {
      try {
        commit('setActiveMorfo', morfoId);
      } catch (error) {
        console.error('Error en switchMorfo:', error);
        throw error;
      }
    },

    addPower({ commit, state }, { morfoId, power }) {
      try {
        const morfo = state.morfos.find(m => m.id === morfoId);
        if (morfo) {
          commit('updateMorfo', {
            morfoId,
            path: 'powers',
            value: [...morfo.powers, power]
          });
        }
      } catch (error) {
        console.error('Error en addPower:', error);
        throw error;
      }
    },

    removePower({ commit, state }, { morfoId, index }) {
      try {
        const morfo = state.morfos.find(m => m.id === morfoId);
        if (morfo) {
          const powers = [...morfo.powers];
          powers.splice(index, 1);
          commit('updateMorfo', {
            morfoId,
            path: 'powers',
            value: powers
          });
        }
      } catch (error) {
        console.error('Error en removePower:', error);
        throw error;
      }
    },

    addRelationship({ commit }) {
      try {
        commit('updateHistory', {
          path: 'relationships',
          value: [...state.history.relationships, { name: '', type: '', description: '' }]
        });
      } catch (error) {
        console.error('Error en addRelationship:', error);
        throw error;
      }
    },

    removeRelationship({ commit }, index) {
      try {
        const relationships = [...state.history.relationships];
        relationships.splice(index, 1);
        commit('updateHistory', {
          path: 'relationships',
          value: relationships
        });
      } catch (error) {
        console.error('Error en removeRelationship:', error);
        throw error;
      }
    },

    updateRelationship({ commit }, { index, field, value }) {
      try {
        const relationships = [...state.history.relationships];
        relationships[index] = { ...relationships[index], [field]: value };
        commit('updateHistory', {
          path: 'relationships',
          value: relationships
        });
      } catch (error) {
        console.error('Error en updateRelationship:', error);
        throw error;
      }
    },

    addGoal({ commit }) {
      try {
        commit('updateHistory', {
          path: 'goals',
          value: [...state.history.goals, { description: '', status: 'active' }]
        });
      } catch (error) {
        console.error('Error en addGoal:', error);
        throw error;
      }
    },

    removeGoal({ commit }, index) {
      try {
        const goals = [...state.history.goals];
        goals.splice(index, 1);
        commit('updateHistory', {
          path: 'goals',
          value: goals
        });
      } catch (error) {
        console.error('Error en removeGoal:', error);
        throw error;
      }
    },

    addCondition({ commit }) {
      try {
        commit('updateAvatar', {
          path: 'conditions',
          value: [...state.avatar.conditions, { name: '', description: '', duration: '' }]
        });
      } catch (error) {
        console.error('Error en addCondition:', error);
        throw error;
      }
    },

    removeCondition({ commit }, index) {
      try {
        const conditions = [...state.avatar.conditions];
        conditions.splice(index, 1);
        commit('updateAvatar', {
          path: 'conditions',
          value: conditions
        });
      } catch (error) {
        console.error('Error en removeCondition:', error);
        throw error;
      }
    }
  },

  getters: {
    activeMorfo(state) {
      return state.morfos.find(m => m.id === state.activeMorfoId);
    },

    effectiveAttributes(state, getters) {
      const ego = state.ego;
      const activeMorfo = getters.activeMorfo;
      
      if (!activeMorfo) return ego.attributes;
      
      return {
        intelligence: ego.attributes.intelligence,
        wits: ego.attributes.wits,
        resolve: ego.attributes.resolve,
        presence: ego.attributes.presence,
        manipulation: ego.attributes.manipulation,
        composure: ego.attributes.composure,
        strength: activeMorfo.attributes.strength,
        dexterity: activeMorfo.attributes.dexterity,
        stamina: activeMorfo.attributes.stamina
      };
    },

    effectiveSkills(state, getters) {
      const ego = state.ego;
      const activeMorfo = getters.activeMorfo;
      
      if (!activeMorfo) return ego.skills;
      
      const skills = { ...ego.skills };
      
      // Apply MORFO skill limits
      Object.keys(activeMorfo.skillLimits).forEach(skillName => {
        const category = Object.keys(skills).find(cat => 
          skills[cat].some(s => s.name === skillName)
        );
        
        if (category) {
          const skillIndex = skills[category].findIndex(s => s.name === skillName);
          if (skillIndex !== -1) {
            skills[category][skillIndex].value = Math.min(
              skills[category][skillIndex].value,
              activeMorfo.skillLimits[skillName]
            );
          }
        }
      });
      
      return skills;
    },

    derivedStats(state, getters) {
      const activeMorfo = getters.activeMorfo;
      if (!activeMorfo) return null;
      
      const { strength, dexterity, stamina } = activeMorfo.attributes;
      
      return {
        size: activeMorfo.derivedStats.size,
        speed: strength + dexterity + 5,
        defense: Math.min(dexterity + Math.floor(stamina / 2), 10),
        armor: activeMorfo.derivedStats.armor,
        initiative: dexterity + Math.floor(stamina / 2),
        health: stamina + Math.floor(strength / 2)
      };
    }
  }
});