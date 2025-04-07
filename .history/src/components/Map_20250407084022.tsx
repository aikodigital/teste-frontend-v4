import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import IconTruck from '../assets/Marcadores/caminhao-operando.svg';
import IconHarvester from '../assets/Marcadores/harvester-operando.svg';
import IconTractor from '../assets/Marcadores/garra-tracadora-operando.svg';
import { FilterEquips, Positions } from '../App';

const Map = (props: any) => {

    const { equips, getInfoCurrentEquip, openDetails } = props

    const [currentEquip, setCurrentEquip] = useState<FilterEquips>({});

    const positionMap: Positions = equips[0].currentPosition

    const truck = L.divIcon({
        html: `
         <svg xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 960 960" width="960" height="960">
	<title>keyboard_arrow_down_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24</title>
	<defs>
		<image width="512" height="512" id="img1" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7d15uC1Fee/x73sAwXkAZNAICg5RFIiAiKjkKkYiUSSicYqzoiioEEWj0Vw16hWvGINxzsX5GgcQAwpGJZqIAgYVcQDEITIJBpHDDG/+qHXwAGfaq2t191r1/TzPepRzdle9a5+9u3+rq7oqMhNJktSWZUMXIEmS+mcAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhpkAJAkqUEGAEmSGmQAkCSpQQYASZIaZACQJKlBBgBJkhq0/lK+OCLuA+wJbAVsAWy21DYkSaNxJXA+cC5wFnBsZp4/bEnqS2Tmmr8g4o7Ay4EnAvfqoyhJ0iASOAk4EvhgZl47cD2aodUGgIi4BXAg8Grgjn0WJUka3JnAqzPz00MXotlYZQCIiM2BzwG79l6RJGlMPgw8PzOvGroQ1XWzABAROwLHAHcZpCJJ0ticBDwuMy8cuhDVc6MAEBF3A04G7jxYRZKkMToJ2MM7AYvjhscAI+LWwNF48Zck3dyuwPuHLkL1rLwOwJuAHYYqRJI0ek+PiL8YugjVEZlJRGwD/BDYYOiCJEmjdg5wn8y8euhC1M2KOwBvwIu/JGnt7g7sP3QR6i6A2wK/BjYcuBZJ0nz4z8z8o6GLUDfLgL3w4i9JWnc7Tp4a0xxbBuw9dBGSpLnjtWPOLQO2HboISdLc8dox55YBWw5dhCRp7njtmHPrA5t3OP45wE8r1SJJ6tfewMFTHtvl2qERCMr2j1PJzKhYiySpRxGxK/DNKQ//Vma6YdwcW7b2L5EkSYvGACBJUoMMAJIkNcgAIElSgwwAkiQ1yAAgSVKDDACSJDXIACBJUoMMAJIkNcgAIElSgwwAkiQ1yAAgSVKDDACSJDXIACBJUoMMAJIkNcgAIElSgwwAkiQ1yAAgSVKDDACSJDXIACBJUoMMAJIkNcgAIElSgwwAkiQ1yAAgSVKDDACSJDXIACBJUoMMAJIkNcgAIElSgwwAkiQ1yAAgSVKDDACSJDVo/aELkCTNpW0j4pNDFzFyVwDfBU4BTs3MKwau50YMAJKkaWwMPGnoIubIuRHxgsz8wtCFrOAQgCRJs7clcExEvH/oQlYwAEiS1J/nRsTzhy4CDACSJPXtsIjYaugiDACSJPXrtoxg/oQBQJKk/u00dAEGAEmS+vfAoQswAEiS1L/Lhy7AACBJUv9OH7oAA4AkSf07fugCDACSJPXrbOAjQxdhAJAkqT9XAwdk5rVDF2IAkCSpH1cCj8/MLw1dCBgAJEmatWuA9wP3zsxjhy5mBXcDlCRN41LgZYzgcbaeHAHcacpjzwNekJlZsZ7ODACSpGn8MDM/NHQRfYmIPYFnT3n43YAHASfVq6g7hwAkSVq7T3U8fr8qVVRkAJAkae2+Avymw/FPiIioVUwNBgBJktYiM68BjurQxIphgNEwAEiStG4WahjAACBJ0rpZqGEAA4AkSetg0YYBDACSJK27hRkGMABIkrTuFmYYwAAgSdI6WqRhAAOAJElLsxDDAAYASZKWZiGGAQwAkiQtwaIMAxgAJElaurkfBjAASJK0dHM/DGAAkCRpiRZhGGD9ITuXJGllEXFLYHtgJ+A+jPs6dY+Ox+8HnFSjkGmM+RsrSWpIRDwXeDtwu6Fr6ckTIuKQzMwhOncIQJI0qIi4dUQcB7yfdi7+MPAwgAFAkjS0twCPHrqIgQz2NIABQJI0mIjYAzhg6DoGNNjTAAYASdKQDgAGXxVvQIMNAxgAJElD2mnoAkZgkGEAA4AkaRARsTGw9dB1jMAgwwAGAEnSUDYduoCRGGQYwAAgSdLweh8GMABIkjS83ocBDACSJA2v92EAA4AkSePQ6zCAAUCSpHHodRjAACBJ0jj0OgzgboCSpHl0AfD6oYtYha2BV3Y4vrctgg0AkqR5dElmvmfoIm4qIjYAngfcacometsi2CEASZIqycxrgKM6NNHbMIABQJKkuj7V8fhengYwAEiSVNdXgN90OL6XpwEMAJIkVTQvwwAGAEmS6hv9MIABQJKk+kY/DGAAkCSpsnkYBjAASJI0G6MeBjAASJI0G6MeBjAASJI0A2MfBjAASJI0O6MdBjAASJI0O6MdBjAASJI0I2MeBjAASJI0W6McBjAASJI0W6McBjAASJI0Q2MdBjAASJI0e6MbBjAASJI0e6MbBjAASJI0Y2McBjAASJLUj1ENAxgAJEnqx6iGAQwAkiT1YGzDAAYASZL6M5phAAOAJEn9Gc0wgAFAkqSejGkYwAAgSVK/RjEMYACQJKlfoxgGMABIktSjSsMAR3QNAQYASZL613UY4IXAP3RpwAAgSVL/ug4DALwoIo6Y9mADgCRpKDl0AUOpMAywwosiYqo7AetX6FySpGn8rsOx94yIw4FLahUzgDtWaueAiMjMfMlSDjIASJKGcgFwPdPdjV4GHFS3nLn24kkIOHBdD3AIQJI0iMy8Drhw6DoWyEsi4u/X9YsNAJKkIZ02dAEL5iUR8c51+UIDgCRpSEcPXcACOnAyP2KNDACSpCEdQ8NPA8zQQRHxjjV9gQFAkjSYzPwVdR6H0829NCL+enV/aQCQJA3tUODaoYtYUG+IiH1X9RcGAEnSoDLzJ8C7h65jQQXwkYjY8aZ/YQCQJI3BK4CThi5iQd0K+HxE3GnlPzQASJIGl5lXAY8H/mvoWhbUXYFXrfwHBgBJ0ihk5vnA7sD3hq5lQb04Iu6y4j8MAJKk0cjMnwO7AZ8ZupYFtBHwuhX/YQCQJI1KZi7PzCcAfwqcPnQ9C+ZZEbENGAAkSSOVmccB2wP7AZ8AfjtsRQthfeBJUB4PmHoFpsyMWhVJkvoVEbsC35zy8G9l5q4161mbiNgA2AG4C7AlsAntfZDdHtinYxvfysxd3Q5YkjQXMvMa4OTJq0kRsQw4Enhah2Z2iYgtWktOkiTNrcy8HtgfOKdDMwH8mQFAkqQ5kpnLgWfRbROlnQ0AkiTNmcw8Efh0hyY2NwBIkjSfvtHhWAOAJElz6tQOxxoAJEmaU6d1OHYzA4AkSXNoMhlwWhsYACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBq0/dAGrEhEbATsA2wO3HLgcSRrKJcApwA8z87qhi9FiGVUAiIitgXcDezKy2iRpQJdHxJHAKzLzsqGL0WIYzRBARDwX+D6wF178JWlltwJeCHw/InYbuhgthlEEgIjYA3gfcJuBS5GkMdsaODoi7jx0IZp/gweAiLg18EEghq5FkubAJsB7hi5C82/wAAA8HbjH0EVI0hx5fETsMHQRmm9jCAC7DF2AJM0hz53qZAwBYKehC5CkOeS5U52MYbb9hkMXIElzyHPngoqIDYEHAPcHbjGrfsYQAE4B7jV0EZI0Z04ZugDVFRH3BI4AHs4ML/wrjGEIwB9iSVo6z50LJCIOAr5LWQhv5hd/GEcA+Bhw0dBFSNIc+Q/gW0MXoToi4s+Bw+l56fvBA0BmXggcMHQdkjQnlgPPyMzrhy5E3UXEpsA/DtH34AEAIDM/BbwRcLMLSVq93wJPz8yzhi5E1RwAbDpEx6MIAACZ+VrgIcAZQ9ciSSN0HHC/zPzc0IWoqp2H6ngMTwHcIDO/BdwvIralPOPqdsCSWrZiO+BTMvP8oYvRTAy2nsOoAsAKk9tbZwGfHLoWSZJmISIC2Gio/kczBCBJUksyM4FTh+rfACBJ0nAGW8/BACBJ0nDeB1w+RMcGAEmSBjKZ8/aqIfo2AEiSNKx3Ae/tu1MDgCRJA8pif2Av4Fd99TvKxwAlSWpNZn4xIu4ObEdZH2BdtgN+wbT9GQAkSRqJzLwG+M/Ja60iYuoA4BCAJEkNMgBIktQgA4AkSQ0yAEiS1CADgCRJDTIASJLUIAOAJEkNWh+4ArjlNAdHxP8Gflq1IkmaHxcDp2bmuX12GhG3BHYEtqXbB7ltOhy7aUQ8s8Px6+Iayvf4ohWvzLxsxn02I4Cz6PZDIEmtOw94P/DGyUIuMxERuwPvoFz815tVPyN3FfBfwEnAv09ep2fm9YNWNZCIyKmPBb4O7F6vHElq1neBp2Xm6TUbjYj1gb8DDsah21W5lBIIjgE+lpn/PXA9vekaAN4HPK9eOZLUtJ8B9695q3oy3PraWu0tuCuBzwAfBL6WmVNfIOdBlwCwDPh8xVokqXVbA/+nVmMRsQsD7Rc/pzYCngp8BTgzIl4eEWvbUKdJQflmXQTceuBaJGlRJLBVZv6ya0MRcQLwyO4lNe1s4ODMPHroQmrrdAcgM68EPlKxHklqXQC7dG4koko7YhvgqIj4ckRsN3QxY7FiMsnrAR+tkKR6dqrQxr2A21VoR8UjgNMi4m2TiZVNWwaQmRdQccxKksRtRtKGbmw94BDgXyNis6GLGdLKj5O8GfjXoQqRpAVzaoU2vg9cXaEd3dzDgO9ExG5DFzKUGwJAZl4L7EdZGEiS1E3nAJCZVwNV1xTQjWwJfC0iXjR0IUO40YISk8UTHgl8b5hyJGkhfJ16F+53V2pHq7YBcEREHDp0IX2LVa2REBG3pjwZ8PjeK5Kk+XY58IDMPLtWgxFxDLB3rfa0Wgdm5ruGLmIpui4EdDOZuTwz96UMCZw5beOS1JjlwLNrXvwnnkedOQVas3dGxLOHLqIvq7wDcKMviNgA+EvgicAegCsqSdLNnUi5+M9kh9TJY2uHUpYE9jw8O9cDT83MTw5dyLrotBfAUpZJjojbAQ8HtgK2ADajbCm8Jk+hjLFM4xPMfgbsfYGdZ9zHyi6j7GT1K+B8yjO+dwHuCmxKWUBkkV1Bee8rXrekvPe7Un6e+tro5Erg//fUlxbXxZRP5qcAZ/ax7nxE3ImyxsBOdN8OeF08Bthkxn2skJSVaVecIy+lnBe2nLxu31MdVwMPyszTeupvar0FgKk6iLiE6f/R7piZl9SsZ2URcVvK7l13n1Ufk/aPouxSdVZm/nYN9dyCciH8X8A+lAmZG86wtj6cTXn/RwNnZObFq/vCySecLSm7U+4DPBq47Qxre15mfmCG7UtzLSL2BL7E7D6YXE15/Pwoytr9v8zMq9ZQz62AewN/RjlH7DijugB+CDwwM6+YYR+dGQCmFBH/BDxzBk2fTZm5+7nMPGfaRiLiNpSL4NOBx1aqrQ8XAEdQ3v/UM6EjYkPKyl1PptxJqv1J5zJghxmM10pzb3Kn4fuUUF7bscCRwHGZ+btpG4mIuwGPA14C3LNSbSt7b2buP4N2qzEATCEi9qVsGVnTxcAbgHdn5jU1G46I3YHDgAfVbLey5ZQaD6u5FSrAZP3ut1ECUU3fBB6amddVbleaaxHxKcpE8JpOBv4qM0+s2ejk7uELgNdRhlJr2mfMmwgZAJYoIjYGfgxsXKnJq4DDgTev6RZ/DRHxROCtlC1Hx+J64APA6zLz/Fl2NLkleRjwgIrNHpqZb63YnjTXIuJJQM1JcD+jTGD81CznSUyGdV8JHEzZ6baGi4H7ZuaFldqrygCwRBFxGOUHpIYLKAnxpErtrVVE3J7yy1n70/A0LgOekpnH9NXhZK7Ee6k3fHMpsE1mXlSpPWluTX6/fkS9uVFfAp406w9HK4uIXSjzCrao1OThmfmySm1VVX0dgEUWEX8AvLhSc6cBO/d58QeY/CLtDbyjz35X4efAbn1e/KEsj5qZz6Js6HF9hSZvR3m0SlK5lV7r4v8u4DF9XvwBMvPblKe7aq2dsH9E3KVSW6PRXAAA/pY6M+uPBnbPzF9WaGvJMvO6zHw58Byg6nyDdfQfwC6Z+f0B+gYgM99OmQ089SSilewfEfeo0I40tyYTj19Toalrgf0z88Ch5tdk5q+AhwKfqtDcRtT5voxKUwEgIu5NWdSoq68CT8jM5RXa6iQzPwQc0HO3ZwB7jWFMLDOPpSxS1fUkcwtKOJRa9lLgzjXaycz3Vmink8kjfE8Bjq/Q3HMiYusK7YxGU3MAIuJw4KCOzZxN+eT7mwolVRMR76Le0MaaXEx5/zNZ7WxaEXEwZXJgF9cAd8nMX1coSZorEbEe8Au6P/b3nsx8YYWSqomIOwAnUdYQ6OIoyuOLY7Et5emoaVzRTACIiI2Ac4E7dmjmUuDBmXlGjZpqmjwG8yXKIkKzcg3wqMz82gz7mFpEHEn3OzyHTIYWpKZExGMpQ5tdfJVyjri2QklVRcS9gG8Bdxi6lpH4aUtDAE+g28Uf4JljvPgDTH7h9gPOm2E3rxzrxX/i+XTfyvo5NQqR5tDzOx5/HrDfGC/+AJn5E+BpQ9cxIue1FACe1/H4r2bm56pUMiOTYYnXz6j5n1Bm9I7WZAnRv+rYzB9GxG416pHmxeTpqK6PFb9+TUt9j0Fm/gtwwtB1jMSPmggAEbEZ8LCOzbyyRi09+BBlkaPa/nqsyX5lmXk8ZW3xLmqvfiaN3eOB9Toc/2PKuWceHErZdKh1n28iAFC2Me7i05l5co1CZm1ykf7rys2enJmfrtzmLHX9BX9ErUKkOfHHHY+fiw8IAJn5HdwJ9HLghFYCQJeJcUn9C+pMZeZnKNuT1vLqim3NXGaeAny2QxPbRUSNR6Gk0YuIZZRt3qd1yuScM09eQ51FxObVxzPzilYCQJd0e9Jk8si8+Uilds6j+y31IXy4w7HBbJ+mkMZkB7pNkP5YrUL6MtkB9JtD1zGQK5jMFVu/p86mfQzwgIj4Qcf+b0O3bSKP6tj/Kk02JNqecoH9cWbWTqNHA++s0M4xs9i8Y7Jpx47Ab4EfzOD24QmU21y3mvL4p0bElRXrkcaq6+S/z1ep4iYiYhvKpmenZ+YFM+jiKOAhM2h37A6frJIImTnTF/Adym30eX3dq+L3YiPgLcBPb9LH7ygXrB1H+L1/TMV6lgEvA35IWblvRR9XUJYWfkTl9//ZEfz8+PK1yK/vV/6dvQfwOeA3N+nnl8C7gdtV7GvbEXz/+n59A7jFDd+Dmv94q/kmf2EEb3ra1xkVvw8PpCyhu6b+rqbcmlmvUp9/0/H9XwZsVKmWbSY/fGvq73rKL/mtKvX5lyP4GfLla5Ffb6p4jnwR5Zyzpv5+ATyyYp+nj+B72NfrHGDTld9/H3MA5nH8fIWv1GhkMqHsi8AfruVLNwBeB7yiRr90r/+kzOx8G3yyCuOxrP12WwAvBP6+a58TVf79JK3WV2s0EhFPBo4Abr2WL/0D4AsRcb8a/VKp/jnwY2DPvMky530EgF63iq3s3ErtHAFssoSvf11E3LdCv/818PErvAG41xK+/jkRsVeFfs+j+yZBklav8zli8gFpKYuMbQgcOVn+vKta57gxOwHYNTPPuulf9BEAvk4Zz5lHnZfVjYhdKMsQL8WGwBu79k33+jsHoIjYAnj5FId23diHLNuQDr5jobTAanxIOhTYeInHPBB4coW+a33IG6NzKSvg7pWr2VNn5gEgy+zuWo+k9e38Cm08uOfjbpBladwuS3PW+OXYhel+zv5w8qRAV4v8Cy4NaXlmXlqhnWnPdQ+q0PeinR8S+DZwCHDPzPzA5IPQKvXxGCDAm4BnAzVO6H2qsbHOzlMet3lE3DUzu96i+hVLT9crH9vVtO8/KM8nf71j/7+ifFqQVFfn88PkNv4OUx6+Y9f+6RYArgCOr1BDF9cCF1CuVT8HvpyZ63zd6iUAZOavI+Iw4G/76K+iGs+B36njsV0DQJf3MPT777p7I9R5D5Jursbv1q0oj0dPY+jzwwWZuU+FGgbT50qAbwZO7LG/Gras0MZ3pjzuSspjg11tMdCxK0z7/gG+W6H/Gu9B0s11/t2aDCGcPeXhQ58f5n74oLcAkJnXUCbDndNXnxXUuHhMuyb/d7Pj6ngREcDmHZoY8v3/d2b+vEL/BgBpNjaJiA0qtDPtOeI/K/RtAOhLZl4E7ElZCW4e1LgD8GXK2MxS1dhacxPK2gLTqvH+vw9Ms5PiP1XoG+q8B0k31/UDxgrTnOsuA/65Qt9dzg8GgKXKsgnDg5jR+tGVdb54ZOZlwDMpszPX1QmZ+b6ufdO9/hrv/zrKinxXLOGwH1JhB8aIuD3T7wUgae1qnCOOB96zxMMOycwad5MNAH3LzN8B+wBPY7pPx315QI1GMvNrlC1112VRmh8Bz6nRL2WzoSGPByAzfwTsz7pNuDkXeEqNFQipVL+k1ar1O3YI6/7Ez4cy872V+u1SvwFgWll8DLg38BLKZjBj25/5YRFxhxoNZeZbKEvhrm7443rg7ZQNgX5Zo0/gcR2Pv3tE3L9GIZn5YcrjPv+xhi/7MHC/zDytRp90f/+S1qzK71hmLgceDhxE2cVzVS4E9s3MKh+QIuI2dNv2e+4DQEw2RBiFiNiMMkdgK8rkjM3oNoYN5RGTP+lw/JMz85Mda7hBRNwC2Gny2pHyQ30K8K3M/EXFfjYCLmLta2uvzWszs8aqhABExDLK+96Z8nz+ZZT3f3JmVt03IiLOomxCNI2fA7WCiDRm2wLTrq1/FbDJZKiziojYBNiVco68B/ADfn+OrNnPE+g2j+C+mTkv89lWaVQBYBYmF5wLWNpa/Cv7RGY+pWJJvYiIvamzD8OpmblThXZ6FRHbUSYgTuslmfkPteqRxioi9qTbgjb7Zeana9XTl4j4KPDUKQ9fDmw8WW11bg02BNCXzLwe+FKHJvaafGqfN/tWaueBEXG3Sm31qev7P7ZKFdL4/Rurv+2+Lh5fq5C+TM7pj+nQxBfn/eIPDQSAiS92OPYOwAG1CulDRGwN1Lxr8aqKbc1cRNwOeHGHJn6cmT+tVY80ZpMLWZdtcfeLiG1r1dOTAyjn9mkdVauQIbUSAL7E0h7Du6nX1JoM2JM3UXYUrOW5EbGU7XyH9kpg0w7HH1erEGlOdPmZ3wD4u1qFzNrkXP6aDk1cC/xLpXIG1UQAyMxfA6d2aOJOlMf4Ri8iam2TubL1KUs5j15E3AV4WcdmvP2v1nS5SwrlLsAuVSqZvVfTbY+SEzPzv2sVM6QmAsBE1091B0bEVlUqma23UVboqm3fiNh1Bu3W9kbglh2OX04ZE5WaMVmg7cyOzby1Ri2zNDmHH9ixmYW4/Q9tBYCus1Q3BD4+5gmBEXEI8Mcz7OIjEVFjB66ZiIj9KKsudvH5RZjcI02h6zlyj8k5aJQm5+6P03149OgK5YzCwj8GuLKIOAbYu2Mz/5SZz65RT00RsRfwBWYf6k4A9pos8TsaEbEj8A26Lf2bwA6Z+b06VUnzIyLuTNmsrcvv0PXA3pk5unk0EfEh4FkdmzkpMx9co54xaOkOAJTbw109KyJeWqGdaiLiPsAn6Offc0/KioWjMTlxHU33df+/4MVfrcrMC4Gue5AsAz4xOSeNxuSc3fXiD/A3FdoYjabuAABExPGUi1gX1wF/npmD3wqKiC2BrwH37LnrUSyUM3nk7zhgtwrNPSgzv12hHWkuTc4nP6X7bfIzgT0yc/DlciPiccBngPU6NnVCZj6qQkmj0dodAIA3VGhjPeCzQ493RcROlK12+774A7wrIg6PiK6/VFOLiG2Ak6hz8f+yF3+1bnLB/mCFpu4JnDz0kwGTc/Rn6X7xT+AV3Ssal+buAABExInAwyo1dyTwgr4njkXEX1D20e4y472GE4An9f1YTET8MWXSUpfHeVa2R2aeWKktaW5NVv48i+77sEDZAfR5mfnRCm2ts4jYEHgv8IxKTX40M59eqa3RaPEOAJS95mvtPPgM4Ct9LZQTEbeOiLdSxvyHvvhDGU75dl+PCEbEBhFxMGXt8loX/+O9+EvFZFOyf6zU3EaUp4feERG3rdTmGk3OxV+h3sX/KrotHDRaTQaAzPwGdZ9Z3Q34QUS8NyK2qNjuDSJi/Yh4ISWZj+1W1LbANyPiM7MKQlE8ETgDOIyyOFENF9H90UFp0RxK+V2r5aXAWRHx4oiocWfhZiJi84j4R8rugTWGBVf4h8z8ecX2RqPJIQAonyQpj43VHqO6HDgcOHyyAmEnkzr/nDJ3YR7W274W+ADw5hrbG092c3wEZXnjnbu2twp/lplfmEG70lyLiAcA36busuIAZ1M+UX8mM6/p2lhEbAwcBLyc7tuf39Q5wB9l5iWV2x2FZgMA3DCJ7DTgNjNo/jrg3ymrRh2Vmecsoa7bAnsB+wB/Ctx+BvVBmRn7yBm2fyrl/R+daQYuBwAAB0hJREFUmeu8Ne9k/O6RwOOAxwKbzaY83pWZXVcFkxZWRBxE+UAzC7+lPMFzFHBcZl66hLruTjk/7APsTvdJfqtyGfDgzDx9Bm2PQtMBACAingH8vx66Oh34EXAecO7kdQFwO2ALYMvJ627ArtRP3Tf1dcon6z2BY5j9cNA5wHf5/Xs/b/LaiN+/9y2Bu1Le/yxC2cq+B+ziqn/SmkXEsZQPJLN0NeWJnl/w+3PEucClwJ258TniPsB2M64ngX0zc2GW/V2V5gMAQER8nPob6IzZL4CdVgxRRMQrgbcMW1KvLqe8/x8OXYg0dpOFtr4LbD50LT36m8ys8cj4qBkAuOGW81HAo4eupQeXAw/JzNNW/sOI+BjwlGFK6tXllKVKu+x/LjUlIrYD/pXyaXzR/XNmPnHoIvpgAJiYhIDPUsbcF9VyysXvazf9i8lkw09RxtQW1Wrfv6Q1i4j7Uh6vm9WcnDE4jfIB6fKhC+lDk48BrspkLHhf4F+GrmVGfgc8enUXv8ls3P3oviPYWC0HHuPFX5pOZp4B7EGZu7OITgb+tJWLPxgAbmSlELBoj4VdCvzJZP2D1crMa4G/oCwytEguo+xg6GI/UgeZ+SNKCBh8jf/KPg48LDMXNdyskgHgJjLzaspz958cupZKzgR2z8xvrssXT7b5fTplUuAijA9dSLn4f33oQqRFkJk/AR4O/GToWipI4NWZ+dTMvHLoYvpmAFiFzLw6M59MWUpynZ9NHaHPUma7r/Mz+FBCQGa+Cng85VndeXUMcP+13fmQtDSZeRawI2W9/Xl1GbBPZr556EKG4iTAtYiIrYEPAw8dtpIluRY4NDPf3rWhiNiWsmDQAzpX1Z/lwMsy8/1DFyItuojYm7KD4Dw9IXAO8NhFXuRnXXgHYC0y82eUMa9DKYtVjN2JwA41Lv5wQ9LfmfL+l9doc8ZOorx/L/5SDyZLad+f+Zg7tZyyrPr2rV/8wTsASxIR21PGxse4XsD5wCGZ+bFZdRARdwX+L+VpgbG5AHgbZQ+G64YuRmpRRDwTeC1wj4FLuanrKHcpXt/aRL81MQBMISJ2BF5FmSw49F2UC4AjgHcuZS3tLiLi4ZT3/yd99LcWP6Nc+D/U4iQeaWwiYj3giZS7hmMYOjwKeNXkCQatxADQwWTr21dSZs3PZIvLNTiD8mn8o0OtZz9ZHexgygqCt+i5+zMod2M+MXl8UdLIRMRjKB8WHtJz11dTVi58U2b+e899zw0DQAWTW+NPpmys81DKBjez8AvgaMrs/hNzJP94EbE58ATKKoIPB9afUVdnAcdTxhq/OJb3L2nNImI3ylNFj6LMF4gZdHMJcCzlHPnFvu6IzjMDQGURsRHwMEoYeBTdboH9mrIJxzcpW+qe2r3C2YqIOwCPoQwP7EjZuWvaQHAJJcUfD5ywlC2VJY3T5APDivPjnky/tHBShgC/QLno/9tkRVOtIwPAjEXEJsBWlB/yzSiPyqz4/5tQblVdSnne/rfAxZTb26dl5tyvtjXZY2E7YAfgD4DbU7ZAXvG/l1PmMVxAWbTngpVeZzmhT1pcERGUCYObc/Pz452B21ImOJ+7itd5k4XbNCUDgCRJDRp6BrskSRqAAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElqkAFAkqQGGQAkSWqQAUCSpAYZACRJapABQJKkBhkAJElq0P8ASCZMnvUJCk8AAAAASUVORK5CYII="/>
	</defs>
	<path id="Forma 1" fill-rule="evenodd" class="s0" d="m505.8 821.3c-14.2 23.7-37.3 23.7-51.5 0-0.1 0.1-67.8-112.5-110.9-184.3-83.3-47.5-139.4-137.1-139.4-240 0-152.6 123.4-276 276-276 152.6 0 276 123.4 276 276 0 103-56.2 192.6-139.6 240.1z"/>
	<use id="caminhao" href="#img1" transform="matrix(.8,0,0,.8,275,199)"/>
</svg>
        `,
        className: '', // Evita estilos padrões do Leaflet
        iconSize: [50, 50],
        iconAnchor: [25, 45],
        popupAnchor: [0, -40],
    });
    const truck2 = L.icon({
        iconUrl: IconTruck,
        iconSize: [100, 100],
        iconAnchor: [25, 45],
        popupAnchor: [0, -40],
    });

    const harvester = L.icon({
        iconUrl: IconHarvester,
        iconSize: [50, 50],
        iconAnchor: [25, 45],
        popupAnchor: [0, -40],
    });

    const tractor = L.icon({
        iconUrl: IconTractor,
        iconSize: [50, 50],
        iconAnchor: [25, 45],
        popupAnchor: [0, -40],
    });

    const getIconByType = (type: string) => {
        switch (type) {
            case 'a3540227-2f0e-4362-9517-92f41dabbfdf':
                return truck;
            case 'a4b0c114-acd8-4151-9449-7d12ab9bf40f':
                return harvester;
            case '9c3d009e-0d42-4a6e-9036-193e9bca3199':
                return tractor;
            default:
                return truck;
        }
    };

    const teste = (item: any) => {
        console.log(item)
        setCurrentEquip(item)
        getInfoCurrentEquip(item)
    }

    return (
        <MapContainer center={positionMap} zoom={11} style={{ height: "801px", width: "100%" }} zoomControl={false} attributionControl={false}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & CartoDB'
            />
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
            />
            {openDetails ? (
                <>
                    {currentEquip.positionHistory[0].positions.map((item, index) => (
                        <Marker key={index} position={item} icon={truck} />
                    ))}
                    <Marker
                        position={currentEquip?.currentPosition}
                        icon={truck2}
                        eventHandlers={{
                            click: () => teste(currentEquip),
                        }} />

                </>
            ) : (
                equips.map((item: FilterEquips, index: number) => (
                    <Marker
                        key={index}
                        position={item?.currentPosition}
                        icon={getIconByType(item?.equipmentModelId)}
                        eventHandlers={{
                            click: () => teste(item),
                        }}
                    >
                        <Tooltip className="popUp" direction="top" offset={[0, -35]} opacity={1} permanent={false}>
                            <span>Equipamento: {item?.nameEquip}</span>
                            <span>Estado atual: {item?.currentState?.status}</span>
                            <span>ID: {item?.name}</span>
                        </Tooltip>
                    </Marker>
                ))
            )}

        </MapContainer >
    );
};

export default Map;
