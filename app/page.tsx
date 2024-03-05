import { CiMenuFries } from "react-icons/ci";
import Carousel from "./components/carousel";
import { Data } from "./constants";
import { BrandLogo } from "./components/brandlogo";
import NavBar from "./components/navbar";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="h-[100vh] w-[100vw]">
      <NavBar />
      <section className="h-5/6 w-full p-5 flex justify-center items-center border-2 border-blue-500">
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none h-[30vh]  m-5 flex flex-col gap-10 items-center text-bold"
        >
          <h3 className="p-2 text-4xl tracking-wide">
            The <span className="text-violet-600">New Era</span> of Healthcare
            Management
          </h3>

          <p className="text-sm font-medium tracking-wider">
            The Patient Fitness Tracker introduces a new era of healthcare
            management, offering a comprehensive platform to streamline patient
            care, optimize operations, and enhance collaboration across medical
            facilities.
          </p>

          <Button
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            Get Started
          </Button>
        </Card>

        <Image src="patient.svg" height="auto" width="90%" />
      </section>

      <section className="h-[80vh] items-center flex flex-col">
        <Carousel data={Data} />
        <p className="p-2 font-bold">
          Trusted and used by over{" "}
          <span className="text-violet-600">1000+</span> clients
        </p>

        <p className="p-2">Famous clients</p>
      </section>

      <section className="">
        <p className="">Features</p>
      </section>

      {/* to be deleted */}
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
        molestiae quaerat qui quae sed ut eum, earum officia doloribus
        dignissimos, accusamus atque itaque quis hic nemo nam unde repudiandae
        excepturi! Quasi alias, possimus optio doloremque necessitatibus earum
        illum facilis non, inventore, ipsum ratione voluptates labore provident!
        Consequuntur, iste! Sint, at error doloribus quasi magni similique
        tempora et alias inventore excepturi! Obcaecati optio necessitatibus
        laborum perspiciatis dolorem odit ex totam ipsa cumque doloremque,
        inventore excepturi praesentium dolores accusamus rerum qui eligendi
        illo doloribus quia! Voluptas magnam voluptate culpa ipsa. Quos, eaque.
        Adipisci accusantium placeat quisquam iste distinctio ad mollitia eaque
        quae totam quas nesciunt quia nulla similique quod sint, corrupti
        tenetur maiores earum quidem cumque reprehenderit magni odio. Ipsum,
        harum culpa. Sapiente facilis consectetur quaerat saepe deserunt
        voluptatem eos animi? Reiciendis iure praesentium, sit, adipisci esse
        iste distinctio, animi voluptatem illo aspernatur dolor quasi nulla
        dolores alias ab? Eius, doloremque voluptatem? Nesciunt dolorem laborum
        esse voluptatem qui, ratione reprehenderit dolorum quos saepe rem
        quibusdam cum quis omnis. Dicta vel, nisi numquam explicabo aspernatur
        neque? Aperiam nisi cupiditate, quaerat commodi ex totam. Hic ab id
        nostrum nesciunt. Omnis iure non quibusdam error, iste tenetur quisquam
        incidunt ducimus commodi, aspernatur fuga explicabo dignissimos
        consectetur possimus sequi dolores, odio quod iusto mollitia odit
        corporis? Vel voluptatum placeat fuga enim quam, omnis magni, vero,
        dolores tenetur quo corrupti consequatur odit esse. Maxime recusandae
        incidunt exercitationem rem nemo commodi minima culpa repellendus! Totam
        velit esse earum. Voluptas veritatis iste dignissimos cumque? At
        doloribus sunt aspernatur tempore neque illum incidunt cumque excepturi,
        molestiae, voluptatem porro sint ipsum, minus voluptas ab natus.
        Obcaecati reprehenderit vel omnis magni doloribus? Laudantium quos id
        soluta quae eaque, hic dolores, reprehenderit quasi, nulla corporis quas
        numquam ipsam. Quasi, nisi. Velit molestias neque doloribus. Quasi,
        laboriosam ipsa eius iure odio molestiae alias adipisci. Eveniet
        doloribus, pariatur odit eum atque quod incidunt fugiat blanditiis
        doloremque in qui recusandae aut ab officia soluta ex facere dolores ea
        sed aliquid aperiam harum deleniti architecto! Fugit, architecto.
        Consequatur ullam alias enim eos repellendus, placeat, itaque minima
        ipsa voluptate reprehenderit veritatis quae ea error laudantium
        provident. Numquam animi adipisci earum assumenda corporis ratione
        similique iure sequi repudiandae temporibus. Ipsam fugit quae esse,
        ratione eligendi et tenetur commodi, rerum, dolores ipsa ullam provident
        a voluptatibus repellat temporibus odio accusantium. Doloremque
        consectetur qui quidem est, pariatur consequatur mollitia suscipit quam.
        Perspiciatis officia hic quaerat quis aliquid provident delectus,
        laboriosam magni, iste iure corrupti sint adipisci, temporibus explicabo
        architecto perferendis similique? Ex tenetur vitae fuga eligendi ipsum,
        eos iure sit magni? Adipisci nobis quaerat facilis deserunt eius? Eius
        corporis provident quia dolorem consequuntur itaque ab praesentium
        quisquam nobis quasi accusantium dignissimos, iste laboriosam nisi nam,
        debitis obcaecati, illo tenetur eligendi aperiam. Dolore pariatur, est
        eum eos fugiat assumenda, architecto, fugit repellat cum blanditiis
        mollitia vitae impedit ab iure voluptate quasi distinctio beatae ea
        sapiente. Molestiae inventore nemo, voluptatibus doloribus et
        recusandae? Ratione asperiores dolores repellendus culpa deleniti, eum
        voluptatum reprehenderit repudiandae explicabo facilis incidunt aliquid
        eligendi quam voluptatibus, quo debitis fugit ipsum atque, facere harum!
        Consectetur quaerat at natus quasi voluptas? Magni sequi quam ipsam
        veniam, illum hic reprehenderit molestias aperiam nam velit ab maiores
        libero qui provident ea quae non necessitatibus? Quo architecto
        veritatis distinctio earum qui natus eveniet quos. Assumenda, fuga? Quis
        maxime saepe magnam similique ab eaque repellat eius doloribus officia
        deleniti placeat, pariatur quaerat dignissimos voluptatibus cumque
        recusandae odio voluptatum autem. Eius, odio. Aliquam odit soluta
        quaerat! Et accusantium alias ad voluptatibus necessitatibus sapiente
        provident amet laborum vitae consequatur magnam, explicabo, incidunt
        eaque maxime vero ratione. Quam voluptatibus assumenda optio aut non
        dolorem iste expedita libero sint. Dolore repellendus sapiente tempore,
        qui expedita perspiciatis accusamus repellat cupiditate minus iure natus
        quo? Dolor commodi modi blanditiis nulla quos necessitatibus excepturi
        corrupti expedita cum iusto voluptatum, fugit, rerum fuga? Sint,
        temporibus deleniti quasi tenetur tempora delectus labore vitae officia
        nulla itaque, veritatis similique dolores tempore doloremque alias
        aperiam laboriosam laborum vero repudiandae esse, eum eligendi quae
        nobis recusandae. Possimus. Ea temporibus ullam blanditiis provident
        repellendus explicabo laboriosam numquam ut, nostrum autem sit velit
        soluta commodi, fugit debitis adipisci nam dignissimos et. Quo quia
        molestiae reprehenderit, error hic vitae illo! Rem magnam debitis ut
        distinctio perferendis sunt repellat, aliquam laborum repellendus
        obcaecati quod alias nihil possimus suscipit facilis nulla, ratione
        incidunt necessitatibus excepturi odio magni consectetur impedit sint.
        Vitae, unde? Officiis itaque doloremque maxime eos nemo ex mollitia
        architecto ad similique, aut blanditiis ut iure ipsa a possimus,
        consequatur dolor! Natus, obcaecati nulla. Illum recusandae quos,
        voluptas soluta deserunt accusamus? Illo dolores ex nobis, magni quam
        quisquam tenetur itaque dicta assumenda enim consequatur! Doloremque
        officiis reprehenderit dolores natus error assumenda molestias aliquid
        deleniti pariatur illo, sunt beatae recusandae blanditiis dolorum. Id
        cupiditate iusto eum neque earum vero, praesentium impedit ducimus
        inventore quas. Molestiae, consectetur veniam suscipit eius eum cumque
        placeat explicabo repellat itaque. Impedit praesentium officiis,
        eligendi corrupti molestiae cum. Quam amet, similique excepturi
        laboriosam provident eum ad id est atque voluptas. Fugit excepturi
        accusamus similique eaque voluptates corrupti facilis sed commodi neque
        quidem accusantium molestias, adipisci doloribus, velit nesciunt?
        Temporibus veniam magnam quisquam alias ab doloremque ipsum sint
        repellendus. Nisi quos dolorum voluptates modi magnam tempore laudantium
        delectus error veritatis incidunt sint autem hic adipisci suscipit
        exercitationem, consectetur inventore? Nulla, eaque voluptas adipisci
        quos, iste doloribus consequuntur sed eos repudiandae possimus excepturi
        explicabo, eligendi iusto reprehenderit at velit. Doloremque praesentium
        nobis accusantium corporis. Optio eligendi voluptates eum aperiam
        commodi! Dolorem ab aliquid maxime consequuntur rerum quo quasi cum
        blanditiis neque, quisquam quibusdam quaerat non minima eligendi ipsam
        dolores, cumque error qui? Debitis iste enim vero pariatur optio
        commodi. Rem. Sequi similique saepe et nihil. Incidunt delectus adipisci
        aliquid laudantium quidem, recusandae, necessitatibus voluptas
        accusantium, voluptatibus a nesciunt animi? Dolore accusamus iusto
        voluptatibus ipsam, dolores ducimus magni molestiae laborum distinctio.
        Ullam laudantium, ut, natus adipisci voluptatum odit quasi tempora,
        placeat debitis repellat hic minima temporibus amet iusto error
        consequatur iure asperiores harum magnam alias corporis in laboriosam
        cupiditate. Porro, vitae. Sit quaerat, perferendis iure perspiciatis
        alias culpa, ipsum atque excepturi dolorum recusandae neque cum eveniet
        voluptatum commodi, incidunt possimus in at? Assumenda dicta odit hic
        voluptates! Facere dolores ipsam voluptatibus? Architecto nesciunt
        nostrum mollitia nobis laudantium eius sunt. Repudiandae aliquam maiores
        ipsa itaque soluta animi debitis totam ipsum, odio laborum nemo
        distinctio labore, maxime expedita veniam unde dolores sint tempore.
        Minima tempora repudiandae voluptatum itaque, corporis impedit fuga,
        officia vel sint vitae possimus eveniet debitis? Cum, eum vitae
        molestias veritatis inventore fuga beatae? Doloremque magnam,
        exercitationem in repudiandae rem incidunt? Dicta eligendi magni
        assumenda libero facere quidem labore, earum sint ea unde rem quaerat
        provident! Architecto id quia eum eius quibusdam, placeat facilis ipsum,
        distinctio error atque eos officia tenetur? Vitae, asperiores quas,
        possimus aliquid veritatis adipisci facere soluta eaque corrupti,
        voluptatem aliquam harum dicta reiciendis ullam? Aut alias ipsum error
        ullam nam, maxime, sit quibusdam quod atque, harum mollitia! Dolorem
        reprehenderit quidem amet. Porro ab ratione laboriosam maiores
        voluptatem error enim, nihil qui. Mollitia modi nulla quas, sit
        necessitatibus illum nisi quo quam quidem laborum nihil dolores nam
        quia. Nihil ut provident dignissimos quo harum nobis saepe porro ex
        laborum dolorem obcaecati magni itaque corrupti veritatis et sit, nulla
        sunt eveniet, ipsam explicabo maiores asperiores! Harum, nisi dolorum.
        Dolorem? Sint tempora laboriosam sit eaque eos? Ipsam perspiciatis aut
        nihil repellendus placeat, at doloribus quasi? Illum illo itaque,
        aliquid numquam tempore quae commodi quo sapiente, ipsam repudiandae
        aliquam accusantium id. Voluptatum enim sint magni ratione ipsa,
        corrupti error quam eos odit porro similique itaque facilis rerum
        dignissimos nobis distinctio non fugit, eveniet reprehenderit cumque
        voluptate? Illo veniam nulla omnis ab! Excepturi cupiditate eius nisi
        harum, impedit dolor, optio, vitae porro libero dicta architecto ducimus
        commodi numquam vel velit! Molestias ab dolores soluta aut architecto!
        Excepturi asperiores ex necessitatibus consequuntur minus. Maxime est
        blanditiis distinctio dolorum eaque cumque ratione voluptates tempora
        saepe. Consequuntur quidem excepturi aliquam veniam tempore ad dicta!
        Molestias numquam eligendi ut maiores reprehenderit dolorem explicabo
        quibusdam mollitia eos. Explicabo sint tempore voluptatibus provident
        quasi delectus dolorem sed voluptas a cumque consequuntur, qui illum
        voluptatem nam aperiam impedit esse ratione id amet earum sapiente culpa
        sit! Minus, nesciunt repellendus? Harum ipsa voluptas enim. Possimus,
        qui! Laborum repellat veniam eaque possimus earum, veritatis molestias,
        enim ullam perspiciatis exercitationem id fugit eos quo facilis nulla
        accusamus soluta tenetur at. Molestiae, maxime. Autem aspernatur magni
        voluptate ut! Iusto non et commodi suscipit laudantium dolore quo
        accusamus quia. Esse, illum cupiditate! Eaque harum excepturi aut
        laboriosam quo iste odio nemo magni nihil maxime? Iusto aperiam veniam
        quasi, vitae eum deserunt, deleniti consequuntur amet ullam
        exercitationem autem sint tempora corrupti cupiditate libero quisquam
        tempore quis commodi consequatur eius veritatis itaque aliquam rem.
        Quis, natus. Corporis accusamus possimus perferendis praesentium eos,
        adipisci quos deserunt error necessitatibus soluta fugit? Blanditiis,
        vel dolor laboriosam a, sapiente quia reiciendis asperiores aliquid,
        esse consectetur amet tenetur iste nesciunt ab. Provident rerum dolorem
        vitae accusantium nostrum eos temporibus perferendis sapiente quae
        delectus sed quisquam, eaque nulla! Sequi voluptates officia esse
        reiciendis minus rem perferendis, beatae sunt! Voluptatum aperiam
        laborum totam! Necessitatibus placeat maiores quae eaque voluptas. Fuga,
        assumenda numquam, doloremque mollitia expedita rerum veritatis eius,
        odio odit itaque porro. Unde qui reprehenderit beatae quibusdam eum
        velit minus natus quis illum! Magnam necessitatibus natus ea perferendis
        sapiente a provident unde sequi debitis fugit incidunt quibusdam
        similique enim eius deleniti sit laboriosam ipsum, voluptatum quisquam
        et laborum? Alias voluptatem tempora mollitia nam? Cum maiores ipsum
        minus? Blanditiis facere voluptatibus ipsum, velit cum eos voluptate
        laudantium quos dicta assumenda beatae amet, ad, consequuntur a id et
        minus architecto maxime dolorum dignissimos neque iure? Dolor omnis,
        perferendis, atque officiis in repellat modi praesentium reprehenderit
        eaque, iure soluta asperiores expedita ipsa unde animi ullam. Magnam
        perspiciatis quam aspernatur quibusdam ipsam voluptas qui sint quo
        consequatur. Illo voluptatum perferendis consequuntur dolor suscipit,
        sit laudantium omnis perspiciatis odio quo totam animi dolores
        distinctio quas, soluta harum, ab eos! Natus omnis commodi corrupti
        obcaecati rerum dolore qui ipsa. Consequatur, voluptates voluptas
        possimus recusandae quam dolor impedit molestiae. Aliquid officia quia,
        libero quidem consequuntur dolore non voluptate qui, laborum corrupti
        magni id deserunt cumque facilis pariatur deleniti quos expedita.
        Accusantium quos hic mollitia rem laudantium laborum quisquam rerum
        deserunt modi. Ipsum repellat fugiat cum harum ut eligendi, optio saepe,
        quas voluptatem, quam rerum a dignissimos libero ipsam dolores
        consequuntur! Nisi deserunt qui blanditiis fugit omnis expedita tempore
        facere excepturi doloremque obcaecati eum amet, alias mollitia iusto
        laboriosam! In odio iste quisquam nemo ipsam obcaecati quos similique
        minima reiciendis veniam. Nisi quis maiores tempora repellat, modi
        molestias possimus quam omnis aperiam sapiente praesentium blanditiis
        consequuntur illum quos officiis. Aperiam inventore ullam nulla, tenetur
        fugiat est tempore dolore ut optio ad? Ad sapiente hic, quod vitae
        officiis iure. Maiores reprehenderit nesciunt architecto amet in eum,
        omnis sint soluta quasi rem consectetur, explicabo atque officia
        repudiandae tempore eos odit alias nemo fugiat. A laudantium harum earum
        eos magnam quod, voluptas delectus voluptatum fuga minima provident
        consectetur repellat optio, excepturi quam consequatur exercitationem
        quaerat odit aut quo necessitatibus molestiae. Veritatis non nisi sit?
        Numquam neque, in enim maiores quod cupiditate repellat odio dolorem quo
        nemo veniam. Dolorem, voluptates! Fugit optio mollitia blanditiis illo
        nobis, similique voluptatem veniam fugiat omnis molestiae facere, sint
        repudiandae? Eligendi, explicabo voluptatibus debitis sapiente deserunt
        similique praesentium aut incidunt fugiat, maiores perspiciatis laborum
        veritatis recusandae odit suscipit ab fuga iste quis unde eius, rerum
        necessitatibus? Ad amet suscipit quo. Dolore commodi impedit optio
        maxime inventore mollitia dignissimos. Iure explicabo non quasi tempora
        pariatur, aspernatur ab vel eligendi harum voluptatibus sint unde
        provident obcaecati maiores! Minima possimus corporis voluptates
        expedita? Quisquam deserunt ab nulla illum. Optio hic voluptas,
        voluptatem obcaecati minus velit delectus eum at expedita atque nulla,
        ipsa minima eaque cupiditate enim, dolore sed odit? Ipsam quibusdam
        eligendi ipsa! Maiores, nihil. Tempore temporibus tenetur consequuntur
        debitis odit quaerat perspiciatis recusandae magni vitae iusto eligendi
        reprehenderit provident voluptate dicta quo impedit nemo numquam,
        corrupti incidunt sit eos. Rerum, alias eos? Ab iure hic tempora,
        maiores deleniti ipsam dignissimos, id ipsa voluptates reiciendis itaque
        fugiat fugit necessitatibus eius, quo nisi expedita sapiente quod atque
        sequi inventore. Repellendus sed consectetur doloremque laudantium.
        Blanditiis rem veniam officiis sed similique quas exercitationem dolorum
        laudantium eveniet praesentium inventore voluptatibus, atque nulla a
        consectetur ab eius neque velit repellendus recusandae odit. Saepe alias
        eaque maiores harum. Hic nihil animi alias sed ut. Quisquam consequatur
        neque sunt ipsam dolorem illo officiis optio exercitationem eum sint
        dolorum repellendus, culpa magni sapiente? Quaerat beatae fuga officia
        id explicabo ab? Velit, amet laboriosam voluptates porro quis voluptas
        delectus expedita soluta adipisci blanditiis illum veritatis, voluptate
        earum aliquam. Quae nobis pariatur voluptate. Numquam maxime velit nemo
        voluptatum impedit molestias dolorum optio? Sequi aut nemo voluptas
        nobis, officiis nihil cum non accusantium, quod in illo sapiente maxime
        eaque nesciunt alias accusamus eligendi nulla, dicta atque. Quis rerum
        repellendus debitis laborum nemo adipisci? Dignissimos natus numquam
        aspernatur minus obcaecati nobis, corrupti odio, eligendi similique
        voluptate unde recusandae illo! Iure ut itaque repudiandae voluptate
        minima, doloribus neque ducimus veniam dolorem, et, laboriosam
        praesentium laudantium. Voluptate tempore perferendis blanditiis iure
        accusantium inventore saepe voluptas voluptatem culpa animi eaque, alias
        minus officiis consequatur nisi assumenda ad nam fuga porro provident
        incidunt. Dolore amet voluptatibus illum nisi. In sint iusto eligendi
        libero perspiciatis. Aspernatur voluptates quidem at beatae saepe
        voluptas esse rerum aperiam nihil eveniet quos, rem ipsa fugiat iste sit
        ipsum optio obcaecati labore maxime id? Optio iusto labore corporis
        laborum. Dolorum cum eum, quasi corporis voluptates ipsum doloribus
        rerum omnis a deleniti nobis iure autem, aspernatur adipisci vero alias
        eius asperiores voluptatibus, doloremque neque repellendus! Voluptas hic
        exercitationem accusantium corrupti, quae culpa reiciendis id veritatis
        qui, quis fuga ut nulla amet placeat ea voluptate quo facilis tempore
        praesentium ipsa asperiores ducimus enim. In, perferendis eum. Corrupti
        libero ut assumenda mollitia quasi, nobis deleniti earum doloremque eius
        eligendi consequatur laborum, repellat facere, qui quo at dicta
        repellendus culpa? Alias temporibus facere, ad corporis facilis quod
        quos. Sequi delectus, est accusamus facere harum reiciendis maxime amet
        pariatur cupiditate minima numquam rerum voluptates dolor. Consequatur
        officia aliquam delectus non odit officiis repellendus facilis qui ullam
        architecto! Voluptatibus, a. Magnam delectus fuga corporis mollitia
        deleniti voluptatem minima cumque eveniet voluptas beatae numquam facere
        quia, nulla eum facilis error culpa odit perspiciatis, ea quo
        exercitationem provident autem? Eligendi, voluptates earum! Enim facilis
        qui asperiores eaque porro repellat consequuntur. Quae ad aperiam
        cupiditate ipsum quibusdam deserunt, aliquid assumenda consequuntur aut
        fugit odit explicabo libero dolorem aspernatur repellendus neque maxime
        reiciendis. Eaque. Maxime dolore error cumque blanditiis aspernatur
        officiis eligendi consequuntur, reiciendis expedita ab maiores
        reprehenderit veritatis cum culpa! Necessitatibus eligendi quam
        perferendis dolore fugiat sit itaque inventore. Laudantium, quam?
        Veritatis, omnis! Laborum voluptas eveniet, pariatur voluptatum sint ea
        consequatur error architecto deleniti ratione aliquam, hic, eligendi
        quas. Numquam quasi cumque molestias quod excepturi nobis, similique,
        sequi vitae modi saepe ducimus labore. Molestiae exercitationem vel
        accusamus repellat necessitatibus est nesciunt animi doloribus
        voluptatibus soluta debitis deserunt, ut facere laudantium dolorem
        distinctio iste placeat alias nostrum! Qui voluptate a alias temporibus
        omnis repellendus. Perspiciatis consectetur reprehenderit id! Beatae,
        magnam nihil? Ex maiores quas obcaecati, iusto quia animi ratione iste
        dignissimos totam vero illo qui in ullam. Dolorem rerum voluptatum
        tempora. Sed, provident fugiat. Cumque officiis corporis asperiores ipsa
        excepturi, non odit aspernatur, pariatur dolorum, voluptates fugit.
        Sunt, necessitatibus non nulla repellat delectus libero error
        asperiores! Repellat nostrum impedit deleniti. Velit aspernatur quidem
        illum. Adipisci similique libero nihil? Impedit deleniti voluptatum
        eaque perferendis dolores doloribus iste, officiis pariatur quisquam
        voluptatibus nisi provident sequi cupiditate dicta aliquid mollitia
        nihil esse aperiam deserunt distinctio explicabo quaerat. Iste numquam
        incidunt at? Molestias tempore at ea exercitationem unde laudantium, sit
        aperiam velit dolore et fugiat quasi quos dignissimos nobis minima quas
        laborum accusamus autem labore expedita delectus qui! Deleniti voluptas
        dolorum iusto? Quis sunt voluptatibus ea rerum amet optio at
        necessitatibus cupiditate accusantium magni esse incidunt nihil tempore
        quae earum, maiores error totam quos nulla ipsum exercitationem
        deleniti. Aliquid enim facere obcaecati eveniet excepturi distinctio cum
        soluta ducimus, quibusdam nam similique, laudantium voluptas, eos omnis
        natus earum! Earum, mollitia natus eius sit soluta suscipit quisquam
        assumenda harum similique? Veritatis, nobis esse earum aperiam ipsa
        maiores natus dignissimos sint, eaque voluptatem quos deserunt dolorem
        quasi fuga est quis corrupti totam eveniet. Nihil eos, doloribus esse
        illum illo inventore enim. Hic, fugit. Repudiandae expedita porro neque
        placeat incidunt distinctio provident rerum natus ut consequuntur
        dignissimos et quam harum quas vitae labore consectetur nulla autem,
        tenetur libero magni? Fuga, modi harum. Minima at, cupiditate dolor
        repellat culpa ullam reprehenderit cumque. Voluptatum aperiam libero
        dolor alias maxime atque! Voluptas laborum vel ab omnis, odit
        consectetur earum, esse nulla, itaque aut voluptatibus ipsa. Sed
        officiis perferendis dolorum, corporis reprehenderit quas expedita
        labore accusamus quaerat nesciunt quod fugiat ipsam placeat obcaecati
        commodi illum voluptatibus quasi autem dolores fuga suscipit veniam.
        Nobis repudiandae consequuntur distinctio. Veniam a nihil obcaecati
        animi, nemo doloremque mollitia accusamus corrupti dolorum officia,
        voluptate exercitationem? Qui blanditiis velit ullam aut rem cumque sit
        excepturi obcaecati quis eius, porro mollitia, explicabo fugiat? Optio
        facere aspernatur, cum eaque esse dicta totam similique neque autem ea
        reiciendis at nulla voluptas unde eius minus repellendus, eveniet odit
        harum. Nostrum delectus blanditiis commodi aspernatur quo optio? Neque
        alias assumenda temporibus dolore voluptatem fuga ducimus. Facilis
        magnam accusamus, cupiditate voluptatum aspernatur ipsam alias cumque
        eius laudantium recusandae deserunt amet provident explicabo, deleniti
        veniam consectetur ab? Dolor, nulla? Id aut vero pariatur beatae ducimus
        asperiores rem veniam, ipsam accusamus sapiente magni quaerat cupiditate
        recusandae temporibus quis. Totam voluptate sed minus voluptatum libero
        quae aliquam voluptatem omnis repudiandae fuga! Porro laborum expedita
        dicta exercitationem dolorum. Velit ducimus id dicta, maiores veniam
        omnis quas vel libero excepturi et quisquam similique numquam autem
        magnam eaque nesciunt voluptates non provident praesentium. Tempore.
        Eligendi, possimus nisi. Voluptates dolor, exercitationem delectus hic
        autem eveniet fugit? Voluptatum quis porro, laborum aspernatur rem nam
        voluptas a hic repellat ipsa quas fugit beatae molestiae reprehenderit
        culpa? Enim? Fugiat dicta dignissimos nihil atque animi debitis illum
        repellat, porro omnis laudantium iusto, itaque ullam dolorum quas odit
        eligendi magni deleniti voluptate necessitatibus labore numquam
        asperiores! Provident labore excepturi suscipit.
      </div>
    </main>
  );
}
